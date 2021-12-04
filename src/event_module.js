import { PointArea , LineArea , TriangleArea } from "./area_module.js"
import { Sprite } from "./element2d_module.js"

export class Event {
	constructor() {}
	execute(requestingArea,x,y,canvas) {
		return;
	}
}

export class EventAddSprite extends Event {
	constructor(image) {
		super();
		this.image = image;
	}
	execute(requestingArea,x,y,canvas) {
		canvas.addElement2d(new Sprite(x,y.this.image));
	}
}

export class EventConsoleLog extends Event {
	constructor(message) {
		super();
		this.message = message;
	}
	execute(requestingArea,x,y,canvas) {
		console.log(this.message,x,y);
	}
}
