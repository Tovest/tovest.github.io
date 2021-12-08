class Canvas {
	constructor(canvasID,camera) {
		this.canvasElement = document.getElementById(canvasID);
		this.camera = camera;
		this.selectableAreas = [];
		this.drawingElements = [];
	}
	render(entityList) {
		this.selectableAreas = [];
		this.drawingElements = [];
		this.clear();
		for (var i=0; i<entityList.length; i++) {
			entityList[i].translateToCanvas(this);
		}
		//// this.triggerHover(x,y);
		for (var i=0; i<this.drawingElements.length; i++) {
			this.drawingElements[i].requestDrawTo(this);
		}
	}
	addSelectableArea(selectableArea) {
		this.selectableAreas.push(selectableArea);
	}
	addDrawingElement(drawingElement) {
		this.drawingElements.push(drawingElement);
	}
	triggerHover(x,y) {
		for (var i=0; i<this.selectableAreas.length; i++) {
			if (this.selectableAreas[i].containsPoint(x,y)) {
				this.selectableAreas[i].onHover.execute();
			}
		}
	}
	triggerClick(x,y) {
		for (var i=0; i<this.selectableAreas.length; i++) {
			if (this.selectableAreas[i].containsPoint(x,y)) {
				this.selectableAreas[i].onClick.execute();
			}
		}
	}
	clear();
	drawPoint(point) {
		console.log("This canvas can't draw Points");
	}
	drawLine(line) {
		console.log("This canvas can't draw Lines");
	}
	drawTriangle(triangle) {
		console.log("This canvas can't draw Triangles");
	}
}

class Canvas2d extends Canvas {
	constructor(canvasID,camera) {
		super(canvasID,camera);
		this.ctx = this.canvasElement.getContext("2d");
	}
	clear() {
		this.ctx.fillStyle = "#FFFFFF";
		this.ctx.fillRect(0,0,this.canvasElement.width,this.canvasElement.height);
	}
	drawPoint(point) {
		var w = this.canvasElement.width/2;
		var h = this.canvasElement.height/2;
		this.ctx.fillStyle = point.color;
		this.ctx.fillRect(w+point.x-2, h+point.y-2, 4, 4);
	}
	drawLine(line) {
		var w = this.canvasElement.width/2;
		var h = this.canvasElement.height/2;
		this.ctx.moveTo(w+line.x1, h+line.y1);
		this.ctx.lineTo(w+line.x2, h+line.y2);
		this.ctx.fillStyle = line.color;
		this.ctx.stroke();
	}
}
