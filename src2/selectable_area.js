function distance(x1,y1,x2,y2) {
	return Math.sqrt(
		(x1-x2)*(x1-x2)+
		(y1-y2)*(y1-y2)
	)
}

function sideOfLineUnormalized(x1,y1,x2,y2,x3,y3) {
	return (x2-x1)*(y1-y3)-(y2-y1)*(x1-x3)
}

class SelectableArea {
	constructor() {
		this.onHover = undefined;
		this.onClick = undefined;
	}
	containsPoint(x,y) {
		return false;
	}
}

class PointArea extends SelectableArea {
	constructor(radius) {
		super();
		this.x = undefined;
		this.y = undefined;
		this.radius = radius;
	}
	containsPoint(x,y) {
		return ( distance(this.x,this.y,x,y) <= this.radius );
	}
}

class LineArea extends SelectableArea {
	constructor(width) {
		super();
		this.x1 = undefined;
		this.y1 = undefined;
		this.x2 = undefined;
		this.y2 = undefined;
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
}

class TriangleArea extends SelectableArea {
	constructor() {
		super();
		this.x1 = undefined;
		this.y1 = undefined;
		this.x2 = undefined;
		this.y2 = undefined;
		this.x3 = undefined;
		this.y3 = undefined;
	}
	containsPoint(x,y) {
		console.log(sideOfLineUnormalized(this.x1,this.y1,this.x2,this.y2,x,y));
		console.log(sideOfLineUnormalized(this.x2,this.y2,this.x3,this.y3,x,y));
		console.log(sideOfLineUnormalized(this.x3,this.y3,this.x1,this.y1,x,y));
		return (
			( sideOfLineUnormalized(this.x1,this.y1,this.x2,this.y2,x,y) >= 0 ) ==
			( sideOfLineUnormalized(this.x2,this.y2,this.x3,this.y3,x,y) >= 0 ) ==
			( sideOfLineUnormalized(this.x3,this.y3,this.x1,this.y1,x,y) >= 0 )
		);
	}
}
