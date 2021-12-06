class Entity {
	constructor() {}
	translateToCanvas(camera,canvas) {
		console.log(this, ">>> this entity has not defined the translateToCanvas function");
	}
}

class SnapPoint extends Entity {
	constructor(x,y,z) {
		super();
		this.point = new VertexEdge(x,y,z);
	}
	translateToCanvas(camera,canvas) {
		var coords = camera.getScreenCoordsOfVertex(this.point);
		var selectableArea = new PointArea(coords.x,coords.y,5,this.point);
		selectableArea.onHover = new EventConsoleLog("Hovering Snap Point");
		selectableArea.onClick = new EventConsoleLog("Clicked Snap Point");
		canvas.addSelectableArea(selectableArea);
	}
}
