import { PointObj } from "./obj_module.js"

export class entity {
	constructor() {}
	translateToCanvas(camera,canvas) {
		//ToDo, this should setup canvas with elements2d and selectable areas.
		return;
	}
}
export class snapPoint {
	constructor(x,y,z) {
		this.point = new PointObj(x,y,z);
	}
	translateToCanvas(camera,canvas) {
		canvas.addElement2d()
		canvas.addSelectableArea()
		return;
	}
	
}
