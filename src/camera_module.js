import { Vector3d } from "./vector.js"

function rotate(point,axis,angle) {
	var s = Math.sin(angle/2);
	var c = Math.cos(angle/2);
	return new Vector3d(
		point.x*(c*c + s*s*(axis.x*axis.x - axis.y*axis.y - axis.z*axis.z)) + point.y*(2*axis.x*s*axis.y*s - 2*c*axis.z*s) + point.z*(2*axis.x*s*axis.z*s + 2*c*axis.y*s),
		point.y*(c*c + s*s*(axis.y*axis.y - axis.z*axis.z - axis.x*axis.x)) + point.z*(2*axis.y*s*axis.z*s - 2*c*axis.x*s) + point.x*(2*axis.y*s*axis.x*s + 2*c*axis.z*s),
		point.z*(c*c + s*s*(axis.z*axis.z - axis.x*axis.x - axis.y*axis.y)) + point.x*(2*axis.z*s*axis.x*s - 2*c*axis.y*s) + point.y*(2*axis.z*s*axis.y*s + 2*c*axis.x*s)
	)
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
	renderEntities(entityList,canvas) {
		return;
	}
	updateAngles(yaw,pitch,roll) {
		this.yaw = yaw;
		this.pitch = pitch;
		this.roll = roll;
		var sy = Math.sin(yaw/2);
		var cy = Math.cos(yaw/2);
		var sy2 = Math.sin((yaw-(Math.PI/2))/2);
		var cy2 = Math.cos((yaw-(Math.PI/2))/2);
		this.vectorFront = new Vector3d(-2*cy*sy,cy*cy-sy*sy,0)
		this.vectorSide = new Vector3d(-2*cy2*sy2,cy2*cy2-sy2*sy2,0)
	}
}

export class CameraOrtho {
	constructor(x,y,z,angX,angY,angZ) {
		super(x,y,z,angX,angY,angZ);
	}
	objToCoords(obj) {
		return obj.getOrthoCoords(this);
	}
}
