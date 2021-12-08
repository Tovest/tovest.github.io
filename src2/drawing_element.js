class DrawingElement {
	constructor() {}
	requestDrawTo(canvas) {}
}

class Poin extends DrawingElement {
	constructor(x,y,z,sprite) {
		super();
		this.x = x;
		this.y = y;
		this.z = z;
		this.sprite = sprite;
	}
	requestDrawTo(canvas) {
		canvas.drawSprite(this);
	}
}

class Line extends DrawingElement {
	constructor(x1,y1,z1,x2,y2,z2,color) {
		super();
		this.x1 = x1;
		this.y1 = y1;
		this.z1 = z1;
		this.x2 = x2;
		this.y2 = y2;
		this.z2 = z2;
		this.color = color;
	}
	requestDrawTo(canvas) {
		canvas.drawLine(this);
	}
}

class Triangle extends DrawingElement {
	constructor(x1,y1,z1,x2,y2,z2,x3,y3,z3,color) {
		super();
		this.x1 = x1;
		this.y1 = y1;
		this.z1 = z1;
		this.x2 = x2;
		this.y2 = y2;
		this.z2 = z2;
		this.x3 = x3;
		this.y3 = y3;
		this.z3 = z3;
		this.color = color;
	}
	requestDrawTo(canvas) {
		canvas.drawTriangle(this);
	}
}
