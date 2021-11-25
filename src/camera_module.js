export class Camera {
	constructor(x,y,z,dirX,dirY,dirZ) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.dirX = dirX;
		this.dirY = dirY;
		this.dirZ = dirZ;
	}
	renderEntities(entityList,canvas) {
		return;
	}
}

export class CameraOrtho {
	constructor(x,y,z,dirX,dirY,dirZ) {
		super(x,y,z,dirX,dirY,dirZ);
	}
	renderEntities(entityList,canvas) {
		for (let i=0; i<entityList.length; i++) {
			entityList[i].translateToCanvas(this,canvas);
		}
	}
	objToCoords(obj) {
		return obj.getOrthoCoords(this);
	}
}
