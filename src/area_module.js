import { Vector2d } from "./vector.js"

function distance(x1,y1,x2,y2) {
	return Math.sqrt(
		(x1-x2)*(x1-x2)+
		(y1-y2)*(y1-y2)
	)
}
function sideOfLineUnormalized(x1,y1,x2,y2,x3,y3) {
	return (x2-x1)*(y1-y3)-(y2-y1)*(x1-x3)
}

class AreaBase {
	constructor() {}
	containsPoint(x,y) {
		return false;
	}
	getCorrispondingPoint(x,y) {
		return undefined;
	}
}

export class PointArea extends AreaBase {
	constructor(x,y,radius) {
		super();
		this.centerX = x;
		this.centerY = y;
		this.radius = radius;
	}
	containsPoint(x,y) {
		var distance = distance(this.centerX,this.centerY,x,y);
		return (distance <= this.radius);
	}
	getCorrispondingPoint(x,y) {
		return new Vector2d(this.centerX,this.centerY);
	}
}

export class LineArea extends AreaBase {
	constructor(x1,y1,x2,y2,width) {
		super();
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.width = width;
	}
	containsPoint(x,y) {
		var length = distance(this.x1,this.y1,this.x2,this.y2);
		var distanceFromLine =
		    Math.abs((this.x2-this.x1)*(this.y1-y)-(this.y2-this.y1)*(this.x1-x))/length;
		var distanceFromPerpendicularBisector =
		    Math.abs((this.y1-this.y2)*((this.y1+this.y2)/2.0-y)-(this.x1-this.x2)*((this.x1+this.x2)/2.0-x))/length;
		return (distanceFromLine <= this.width && distanceFromPerpendicularBisector <= length/2.0);
	}
	getCorrispondingPoint(x,y) {
		return undefined; //ToDo
	}
}

export class TriangleArea extends AreaBase {
	constructor(x1,y1,x2,y2,x3,y3) {
		super();
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.x3 = x3;
		this.y3 = y3;
	}
	containsPoint(x,y) {
		return (
			( sideOfLineUnormalized(this.x1,this.y1,this.x2,this.y2,x,y) >= 0 ) ==
			( sideOfLineUnormalized(this.x2,this.y2,this.x3,this.y3,x,y) >= 0 ) ==
			( sideOfLineUnormalized(this.x3,this.y3,this.x1,this.y1,x,y) >= 0 )
		);
	}
	getCorrispondingPoint(x,y) {
		return new Vector2d(x,y);
	}
}
