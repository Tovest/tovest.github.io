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
		var screenCoords = camera.getScreenCoordsOfVertex(this.point);
		var selectableArea = new PointArea(screenCoords.x,screenCoords.y,5,this.point);
		selectableArea.onHover = new EventConsoleLog("Hovering Snap Point"); //new EventAddSprite
		selectableArea.onClick = new EventConsoleLog("Clicked Snap Point"); //new EventReturnCorrispondingVertex
		canvas.addSelectableArea(selectableArea);
	}
}

class Line extends Entity {
	constructor(x1,y1,z1,x2,y2,z2) {
		super();
		this.endpoint1 = new VertexEdge(x1,y1,z1);
		this.endpoint2 = new VertexEdge(x2,y2,z2);
		this.middlepoint = new VertexMidpoint(this.endpoint1,this.endpoint2);
	}
	translateToCanvas(camera,canvas) {
		var screenCoordsEndpoint1 = camera.getScreenCoordsOfVertex(this.endpoint1);
		var screenCoordsEndpoint2 = camera.getScreenCoordsOfVertex(this.endpoint2);
		var selectableAreaEndpoint1 = new PointArea(screenCoordsEndpoint1.x,screenCoordsEndpoint1.y,5,this.endpoint1);
		var selectableAreaEndpoint2 = new PointArea(screenCoordsEndpoint2.x,screenCoordsEndpoint2.y,5,this.endpoint2);
		selectableArea.onHover = new EventConsoleLog("Hovering Snap Point"); //new EventAddSelectableArea
		selectableArea.onClick = new EventConsoleLog("Clicked Snap Point"); //new EventAddVertex
		var selecrableAreaLine = new LineArea(screenCoordsEndpoint1.x, screenCoordsEndpoint1.y, screenCoordsEndpoint2.x, screenCoordsEndpoint2.y, 5)
		canvas.addSelectableArea(selectableArea);
	}
}
