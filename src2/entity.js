class Entity {
	constructor() {}
	translateToCanvas(camera,canvas) {
		console.log(this, "this entity has not defined the translateToCanvas function");
	}
}

class SnapPointEntity extends Entity {
	constructor(vertex) {
		super();
		this.vertex = vertex;
		this.selectableArea = new PointArea(5);
		this.selectableArea.onHover = new EventLog("Hovering Snap Point"); //new EventAddSprite
		this.selectableArea.onClick = new EventInputVertex(this.vertex);
		this.drawingElement = new PointDrawing(0,0,0,"#FF0000");
	}
	static create(x,y,z) {
		return new SnapPointEntity(new VertexEdge(x,y,z));
	}
	translateToCanvas(canvas,terminal) {
		this.selectableArea.onHover.connectedTerminal = terminal;
		this.selectableArea.onClick.connectedTerminal = terminal;
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

class LineEntity extends Entity {
	constructor(endpointVertex1,endpointVertex2) {
		super();
		this.endpointVertex1 = endpointVertex1;
		this.endpointVertex2 = endpointVertex2;
		this.selectableArea = new LineArea(5);
		this.selectableArea.onHover = new EventLog("Hovering Line"); //new EventAddSprite and EventAddSelectableArea which when clicked EventRespondWithVertex...?
		this.selectableArea.onClick = new EventLog("Clicked Line"); //new EventAddNewLinePoint
		this.drawingElement = new LineDrawing(0,0,0,0,0,0,"#00FF00");
	}
	translateToCanvas(canvas,terminal) {
		this.selectableArea.onHover.connectedTerminal = terminal;
		this.selectableArea.onClick.connectedTerminal = terminal;
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

class TriangleEntity extends Entity {
	constructor(vertex1,vertex2,vertex3) {
		super();
		this.vertex1 = vertex1;
		this.vertex2 = vertex2;
		this.vertex3 = vertex3;
		this.selectableArea = new TriangleArea();
		this.selectableArea.onHover = new EventLog("Hovering Triangle");
		this.selectableArea.onClick = new EventLog("Clicked Triangle");
		this.drawingElement = new TriangleDrawing(0,0,0,0,0,0,0,0,0,"#FF00FF");
	}
	translateToCanvas(canvas,terminal) {
		this.selectableArea.onHover.connectedTerminal = terminal;
		this.selectableArea.onClick.connectedTerminal = terminal;
		var screenCoordsVertex1 = canvas.camera.getScreenCoordsOfVertex(this.vertex1);
		var screenCoordsVertex2 = canvas.camera.getScreenCoordsOfVertex(this.vertex2);
		var screenCoordsVertex3 = canvas.camera.getScreenCoordsOfVertex(this.vertex3);
		this.selectableArea.x1 = screenCoordsVertex1.x;
		this.selectableArea.y1 = screenCoordsVertex1.y;
		this.selectableArea.x2 = screenCoordsVertex2.x;
		this.selectableArea.y2 = screenCoordsVertex2.y;
		this.selectableArea.x3 = screenCoordsVertex3.x;
		this.selectableArea.y3 = screenCoordsVertex3.y;
		canvas.addSelectableArea(this.selectableArea);
		this.drawingElement.x1 = screenCoordsVertex1.x;
		this.drawingElement.y1 = screenCoordsVertex1.y;
		this.drawingElement.z1 = screenCoordsVertex1.z;
		this.drawingElement.x2 = screenCoordsVertex2.x;
		this.drawingElement.y2 = screenCoordsVertex2.y;
		this.drawingElement.z2 = screenCoordsVertex2.z;
		this.drawingElement.x3 = screenCoordsVertex3.x;
		this.drawingElement.y3 = screenCoordsVertex3.y;
		this.drawingElement.z3 = screenCoordsVertex3.z;
		canvas.addDrawingElement(this.drawingElement);
	}
}
