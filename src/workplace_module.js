import { Camera } from "./camera_module.js"

export class Workplace {
	constructor() {
		
	}
}

export class World {
	constructor() {
		this.objList = [];
		this.camera = new Camera(0,0,0,0,1,0,90);
	}
}
