import { Vector3d } from "./vector.js"

function rotate(point,axis,angle) {
	var s = Math.sin(angle/2);
	var c = Math.cos(angle/2);
	return new Vector3d(
		point.x*(c*c + s*s*(axis.x*axis.x - axis.y*axis.y - axis.z*axis.z)) + point.y*(2*axis.x*s*axis.y*s - 2*c*axis.z*s) + point.z*(2*axis.x*s*axis.z*s + 2*c*axis.y*s),
		point.y*(c*c + s*s*(axis.y*axis.y - axis.z*axis.z - axis.x*axis.x)) + point.z*(2*axis.y*s*axis.z*s - 2*c*axis.x*s) + point.x*(2*axis.y*s*axis.x*s + 2*c*axis.z*s),
		point.z*(c*c + s*s*(axis.z*axis.z - axis.x*axis.x - axis.y*axis.y)) + point.x*(2*axis.z*s*axis.x*s - 2*c*axis.y*s) + point.y*(2*axis.z*s*axis.y*s + 2*c*axis.x*s)
	);
}

export class Camera {
	constructor(x,y,z,yaw,pitch,roll) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.yaw = undefined;
		this.pitch = undefined;
		this.roll = undefined;
		this.vectorFront = undefined;
		this.vectorSide = undefined;
		this.vectorUp = undefined;
		updateAngles(yaw,pitch,roll);
	}
	updateAngles(yaw,pitch,roll) {
		this.yaw = yaw;
		this.pitch = pitch;
		this.roll = roll;
		var sy = Math.sin(yaw/2);
		var cy = Math.cos(yaw/2);
		var sy2 = Math.sin((yaw-(Math.PI/2))/2);
		var cy2 = Math.cos((yaw-(Math.PI/2))/2);
		this.vectorFront = new Vector3d(-2*cy*sy,cy*cy-sy*sy,0);
		this.vectorSide = new Vector3d(-2*cy2*sy2,cy2*cy2-sy2*sy2,0);
		this.vectorFront = rotate(this.vectorFront,this.vectorSide,pitch);
		this.vectorSide = rotate(this.vectorSide,this.vectorFront,roll);
		this.vectorUp = new Vector3d(
			(this.vectorSide.y*this.vectorFront.z)-(this.vectorSide.z*this.vectorFront.y),
			(this.vectorSide.z*this.vectorFront.x)-(this.vectorSide.x*this.vectorFront.z),
			(this.vectorSide.x*this.vectorFront.y)-(this.vectorSide.y*this.vectorFront.x)
		);
	}
	getScreenCoordsOfVertex(x,y,z) {
		console.log("This camera hasn't defined the getScreenCoordsOfVertex function")
		return new Vector3d(0,0,0);
	}
}

export class CameraOrtho {
	constructor(x,y,z,yaw,pitch,roll) {
		super(x,y,z,yaw,pitch,roll);
	}
	getScreenCoordsOfVertex(x,y,z) {
		var vertexRotated = new rotate(new Vector3d(x,y,z),this.vectorSide,Math.PI);
		//// The vertex projection's position on the front plane is simply the mid point between
		//// the original position and the position of the vertex rotated 180° around vectorSide
		var projection = new Vector3d( (x+vertexRotated.x)/2 , (y+vertexRotated.y)/2 , (z+vertexRotated.z)/2 );
		//// Then the screen coords are the distances from the three planes
		return new Vector3d(
			this.vectorSide.x*(projection.x-this.x) + this.vectorSide.y*(projection.y-this.y) + this.vectorSide.z*(projection.z-this.z),
			this.vectorUp.x*(projection.x-this.x) + this.vectorUp.y*(projection.y-this.y) + this.vectorUp.z*(projection.z-this.z),
			// z = Depth
			this.vectorFront.x*(projection.x-this.x) + this.vectorFront.y*(projection.y-this.y) + this.vectorFront.z*(projection.z-this.z)
		)
	}
}
