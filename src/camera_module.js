export class Camera {
	constructor(x,y,z,dirX,dirY,dirZ) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.dirX = dirX;
		this.dirY = dirY;
		this.dirZ = dirZ;
	}
	translateToElements2d(objList) {
		return [];
	}
}

export class CameraOrtho {
	constructor(x,y,z,dirX,dirY,dirZ) {
		super(x,y,z,dirX,dirY,dirZ);
	}
	translateToElements2d(objList) {
		var elements2d = [];
		for (int i=0; i<objList.length; i++) {
			elements2d.push( ...(objList[i].toElements2d(this)) );
		}
	}
}
