class Canvas {
	constructor(canvasID,camera) {
		this.canvasElement = document.getElementById(canvasID);
		this.canvasElement.handler = this;
		this.canvasElement.onmousemove = function(e) {e.target.handler.triggerHover(e.offsetX,e.offsetY)};
		this.canvasElement.onclick = function(e) {e.target.handler.triggerClick(e.offsetX,e.offsetY)};
		this.camera = camera;
		this.selectableAreas = [];
		this.drawingElements = [];
	}
	render(entityList,terminal) {
		this.selectableAreas = [];
		this.drawingElements = [];
		this.clear();
		for (var i=0; i<entityList.length; i++) {
			entityList[i].translateToCanvas(this,terminal);
		}
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
			if (this.selectableAreas[i].containsPoint(x-this.canvasElement.width/2,this.canvasElement.height/2-y)) {
				this.selectableAreas[i].onHover.execute();
			}
		}
	}
	triggerClick(x,y) {
		for (var i=0; i<this.selectableAreas.length; i++) {
			if (this.selectableAreas[i].containsPoint(x-this.canvasElement.width/2,this.canvasElement.height/2-y)) {
				this.selectableAreas[i].onClick.execute();
			}
		}
	}
	clear() {
		console.log("This canvas can't clear itself");
	}
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
		if (point.z < 0) return;
		var w = this.canvasElement.width/2;
		var h = this.canvasElement.height/2;
		this.ctx.fillStyle = point.color;
		this.ctx.fillRect(w+point.x-2, h-point.y-2, 4, 4);
	}
	drawLine(line) {
		var w = this.canvasElement.width/2;
		var h = this.canvasElement.height/2;
		this.ctx.beginPath();
		this.ctx.lineWidth = 2;
		this.ctx.moveTo(w+line.x1, h-line.y1);
		this.ctx.lineTo(w+line.x2, h-line.y2);
		this.ctx.closePath();
		this.ctx.fillStyle = line.color;
		this.ctx.stroke();
	}
	drawTriangle(triangle) {
		var w = this.canvasElement.width/2;
		var h = this.canvasElement.height/2;
		this.ctx.beginPath();
		this.ctx.lineWidth = 1;
		this.ctx.moveTo(w+triangle.x1, h-triangle.y1);
		this.ctx.lineTo(w+triangle.x2, h-triangle.y2);
		this.ctx.lineTo(w+triangle.x3, h-triangle.y3);
		this.ctx.lineTo(w+triangle.x1, h-triangle.y1);
		this.ctx.closePath();
		this.ctx.fillStyle = triangle.color;
		this.ctx.stroke();
		this.ctx.fillStyle = "#000000";
		this.ctx.fill();
	}
}
