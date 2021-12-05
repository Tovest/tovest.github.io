class Entity {
	constructor() {}
	translateToCanvas(camera,canvas) {
		console.log(this, ">>> this entity has not defined the translateToCanvas function");
	}
}

class SnapPoint extends Entity {
	constructor(x,y,z) {
		super();
		this.point = new Point(x,y,z);
	}
	translateToCanvas(camera,canvas) {
		console.log("gotHere");
		var coords = camera.getScreenCoordsOfVertex(this.point.x,this.point.y,this.point.z);
		var selectableArea = new SelectableArea(new PointArea(coords.x,coords.y,5));
		selectableArea.onHover = new EventConsoleLog("Hovering Snap Point");
		selectableArea.onClick = new EventConsoleLog("Clicked Snap Point");
		canvas.addSelectableArea(selectableArea);
	}
}
