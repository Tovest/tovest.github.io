function distance(x1,y1,x2,y2) {
	return Math.sqrt(
		(x1-x2)*(x1-x2)+
		(y1-y2)*(y1-y2)
	)
}
class AreaBase {
	constructor() {}
	isInArea(x,y) {
		return false;
	}
}

export class PointArea extends AreaBase {
	constructor(x,y,radius) {
		super();
		this.x = x;
		this.y = y;
		this.radius = radius;
	}
	isInArea(x,y) {
		var distance = distance(this.x1,this.y1,x,y);
		return (distance <= this.radius);
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
	isInArea(x,y) {
		var distanceFrom1 = distance(this.x1,this.y1,x,y);
		if (distanceFrom1 <= this.width) return true;
		var distanceFrom2 = distance(this.x2,this.y2,x,y);
		if (distanceFrom2 <= this.width) return true;
		var length = distance(this.x1,this.y1,this.x2,this.y2);
		var distanceFromLine =
		    Math.abs((this.x2-this.x1)*(this.y1-y)-(this.y2-this.y1)*(this.x1-x))/length;
		var distanceFromPerpendicularBisector =
		    Math.abs((this.y1-this.y2)*((this.y1+this.y2)/2.0-y)-(this.x1-this.x2)*((this.x1+this.x2)/2.0-y))/length;
		return (distanceFromLine <= this.width && distanceFromPerpendicularBisector <= length/2);
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
	isInArea(x,y) {
		return false; //ToDo
	}
}
