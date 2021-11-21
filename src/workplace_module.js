import { Camera } from "./camera_module.js"

export class World {
	constructor() {
		this.objList = [];
	}
}

export class View {
	constructor() {
		this.world = undefined;
		this.canvas = undefined;
		this.elements2d = [];
	}
	render() {
		console.log(this.elements2d);
	}
}

export class Workplace {
	constructor() {
		//this.options = undefined; //Not yet, ToDo
		//this.
	}
}
