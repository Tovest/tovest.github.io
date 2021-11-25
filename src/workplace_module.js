import { CameraOrtho } from "./camera_module.js";
import { Canvas } from "./canvas_module.js";

export class Workplace {
	constructor(canvas) {
		this.entityList = [];
		this.activeCamera = new CameraOrtho(0,0,0,0,1,0);
		this.canvas = canvas;
	}
	render() {
		this.activeCamera.renderEntities(this.entityList,this.canvas);
	}
}
