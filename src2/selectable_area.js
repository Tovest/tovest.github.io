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
	constructor(area) {
		this.onHover = undefined;
		this.onClick = undefined;
	}
	containsPoint(x,y) {
		return false;
	}
	getCorrispondingPoint(x,y) {
		return undefined;
	}
}

class PointArea extends SelectableArea {
	constructor(x,y,radius,corrispongingVertex) {
		super();
		this.centerX = x;
		this.centerY = y;
		this.radius = radius;
		this.corrispongingVertex = corrispongingVertex;
	}
	containsPoint(x,y) {
		var dist = distance(this.centerX,this.centerY,x,y);
		return (dist <= this.radius);
	}
	getCorrispondingVertex(x,y) {
		return this.corrispongingVertex;
	}
}

class LineArea extends SelectableArea {
	constructor(x1,y1,x2,y2,width,corrispongingVertex1,corrispongingVertex2) {
		super();
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.width = width;
		this.corrispongingVertex1 = corrispongingVertex1;
		this.corrispongingVertex2 = corrispongingVertex2;
	}
	containsPoint(x,y) {
		var length = distance(this.x1,this.y1,this.x2,this.y2);
		var distanceFromLine =
		    Math.abs((this.x2-this.x1)*(this.y1-y)-(this.y2-this.y1)*(this.x1-x))/length;
		var distanceFromPerpendicularBisector =
		    Math.abs((this.y1-this.y2)*((this.y1+this.y2)/2.0-y)-(this.x1-this.x2)*((this.x1+this.x2)/2.0-x))/length;
		return (distanceFromLine <= this.width && distanceFromPerpendicularBisector <= length/2.0);
	}
	getCorrispondingVertex(x,y) {
		return undefined; //ToDo
	}
}

class TrisArea extends SelectableArea {
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
	getCorrispondingVertex(x,y) {
		return undefined; //ToDO
	}
}
