export class SelectableArea {
	constructor(area) {
		this.area = area;
		this.onHover = undefined;
		this.onClick = undefined;
	}
	notifyHover(x,y,canvas) {
		this.onHover.execute(this,x,y,canvas);
	}
	notifyClick(x,y,canvas) {
		this.onClick.execute(this,x,y,canvas);
	}
}
