export class Camera {
	constructor(x,y,z,angX,angY,angZ) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.angX = angX;
		this.angY = angY;
		this.angZ = angZ;
	}
	renderEntities(entityList,canvas) {
		return;
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
