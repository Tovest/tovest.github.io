import { PointArea , LineArea , TriangleArea } from "./area_module.js"
import { Sprite } from "./element2d_module.js"

export class event {
	constructor() {}
	execute(requestingArea,x,y,canvas) {
		return;
	}
}

export class eventAddSprite extends event {
	constructor(image) {
		this.image = image;
	}
	execute(requestingArea,x,y,canvas) {
		canvas.addElement2d(new Sprite(x,y.this.image));
	}
}

export class eventConsoleLog extends event {
	constructor(message) {
		this.message = message;
	}
	execute(requestingArea,x,y,canvas) {
		console.log(this.message,x,y);
	}
}
