import { PointArea , LineArea , TriangleArea } from "./area_module.js"
import { Sprite } from "./element2d_module.js"

export class event {
	constructor() {}
	execute(requestingArea,x,y,canvas) {
		return;
	}
}

export class eventAddSprite {
	constructor(image) {
		this.image = image;
	}
	execute(requestingArea,x,y,canvas) {
		canvas.addElement2d(new Sprite(x,y.this.image));
	}
}
