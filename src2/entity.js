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
		this.selectableArea = new PointArea(5);
		this.selectableArea.onHover = new EventConsoleLog("Hovering Snap Point"); //new EventAddSprite
		this.selectableArea.onClick = new EventConsoleLog("Clicked Snap Point"); //new EventRespondWithVertex(this.point)
		this.drawingElement = new PointDrawing(0,0,0,"#FF0000");
	}
	static create(x,y,z) {
		return new SnapPoint(new VertexEdge(x,y,z));
	}
	translateToCanvas(canvas) {
		var screenCoords = canvas.camera.getScreenCoordsOfVertex(this.vertex);
		this.selectableArea.x = screenCoords.x;
		this.selectableArea.y = screenCoords.y;
		canvas.addSelectableArea(this.selectableArea);
		this.drawingElement.x = screenCoords.x;
		this.drawingElement.y = screenCoords.y;
		this.drawingElement.z = screenCoords.z;
		canvas.addDrawingElement(this.drawingElement);
	}
}

class Line extends Entity {
	constructor(endpointVertex1,endpointVertex2) {
		super();
		this.endpointVertex1 = endpointVertex1;
		this.endpointVertex2 = endpointVertex2;
		this.selectableArea = new LineArea(5);
		this.selectableArea.onHover = new EventConsoleLog("Hovering Line"); //new EventAddSprite and EventAddSelectableArea which when clicked EventRespondWithVertex...?
		this.selectableArea.onClick = new EventConsoleLog("Clicked Line"); //new EventAddNewLinePoint
		this.drawingElement = new LineDrawing(0,0,0,0,0,0,"#00FF00");
	}
	translateToCanvas(canvas) {
		var screenCoordsEndpoint1 = canvas.camera.getScreenCoordsOfVertex(this.endpointVertex1);
		var screenCoordsEndpoint2 = canvas.camera.getScreenCoordsOfVertex(this.endpointVertex2);
		this.selectableArea.x1 = screenCoordsEndpoint1.x;
		this.selectableArea.y1 = screenCoordsEndpoint1.y;
		this.selectableArea.x2 = screenCoordsEndpoint2.x;
		this.selectableArea.y2 = screenCoordsEndpoint2.y;
		canvas.addSelectableArea(this.selectableArea);
		this.drawingElement.x1 = screenCoordsEndpoint1.x;
		this.drawingElement.y1 = screenCoordsEndpoint1.y;
		this.drawingElement.z1 = screenCoordsEndpoint1.z;
		this.drawingElement.x2 = screenCoordsEndpoint2.x;
		this.drawingElement.y2 = screenCoordsEndpoint2.y;
		this.drawingElement.z2 = screenCoordsEndpoint2.z;
		canvas.addDrawingElement(this.drawingElement);
	}
}
