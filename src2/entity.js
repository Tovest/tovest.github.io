class Entity {
	constructor() {}
	translateToCanvas(camera,canvas) {
		console.log(this, ">>> this entity has not defined the translateToCanvas function");
	}
}

class SnapPoint extends Entity {
	constructor(vertex) {
		super();
		this.vertex = vertex;
		this.selectableArea = new PointArea(this.vertex,5);
		this.selectableArea.onHover = new EventConsoleLog("Hovering Snap Point"); //new EventAddSprite
		this.selectableArea.onClick = new EventConsoleLog("Clicked Snap Point"); //new EventRespondWithVertex(this.point)
	}
	static create(x,y,z) {
		return new SnapPoint(new VertexEdge(x,y,z));
	}
	translateToCanvas(canvas) {
		var screenCoords = canvas.camera.getScreenCoordsOfVertex(this.vertex);
		this.selectableArea.x = screenCoords.x;
		this.selectableArea.y = screenCoords.y;
		canvas.addSelectableArea(this.selectableArea);
	}
}

class Line extends Entity {
	constructor(endpointVertex1,endpointVertex2) {
		super();
		this.endpointVertex1 = endpointVertex1;
		this.endpointVertex2 = endpointVertex2;
		this.selectableArea = new LineArea(this.endpointVertex1,this.endpointVertex2);
		this.selectableArea.onHover = new EventConsoleLog("Hovering Line"); //new EventAddSprite
		this.selectableArea.onClick = new EventConsoleLog("Clicked Line"); //new EventAddNewLinePoint
	}
	translateToCanvas(canvas) {
		var screenCoordsEndpoint1 = canvas.camera.getScreenCoordsOfVertex(this.endpointVertex1);
		var screenCoordsEndpoint2 = canvas.camera.getScreenCoordsOfVertex(this.endpointVertex2);
		this.selectableArea.x1 = screenCoordsEndpoint1.x;
		this.selectableArea.y1 = screenCoordsEndpoint1.y;
		this.selectableArea.x2 = screenCoordsEndpoint2.x;
		this.selectableArea.y2 = screenCoordsEndpoint2.y;
		canvas.addSelectableArea(this.selectableArea);
	}
}
