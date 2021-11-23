export class SelectableArea {
	constructor(area) {
		this.area = area;
		this.onHover = undefined;
		this.onClick = undefined;
	}
	notifyHover(x,y,canvas) {
		var point = this.area.getCorrispondingPoint(x,y);
		this.onHover.execute(this,point[0],point[1],canvas);
	}
	notifyClick(x,y,canvas) {
		var point = this.area.getCorrispondingPoint(x,y);
		this.onClick.execute(this,point[0],point[1],canvas);
	}
}
