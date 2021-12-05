class SelectableArea {
	constructor(area) {
		this.area = area;
		this.onHover = undefined;
		this.onClick = undefined;
	}
	notifyHover(x,y,canvas) {
		var point = this.area.getCorrispondingPoint(x,y);
		this.onHover.execute(this,point.x,point.y,canvas);
	}
	notifyClick(x,y,canvas) {
		var point = this.area.getCorrispondingPoint(x,y);
		this.onClick.execute(this,point.x,point.y,canvas);
	}
}
