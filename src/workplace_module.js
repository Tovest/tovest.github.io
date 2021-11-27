import { CameraOrtho } from "./camera_module.js";
import { Canvas } from "./canvas_module.js";

export class Workplace {
	constructor(camera,canvas) {
		this.entityList = [];
		this.activeCamera = camera;
		this.canvas = canvas;
	}
	render() {
		for (let i=0; i<this.entityList.length; i++) {
			this.entityList[i].translateToCanvas(this.activeCamera,this.canvas);
		}
	}
}
