class Canvas {
	constructor(canvasElement, camera) {
		this.selectableAreas = [];
		this.elements2d = [];
		this.canvasElement = canvasElement;
		this.camera = camera;
	}
	render(entityList) {
		this.selectableAreas = [];
		this.elements2d = [];
		for (var i=0; i<entityList.length; i++) {
			entityList[i].translateToCanvas(this);
		}
		//// this.triggerHover(x,y);
	}
	addSelectableArea(selectableArea) {
		this.selectableAreas.push(selectableArea);
	}
	addElement2d(element2d) {
		this.element2d.push(element2d);
	}
	triggerHover(x,y) {
		for (var i=0; i<this.selectableAreas.length; i++) {
			if (this.selectableAreas[i].containsPoint(x,y)) {
				this.selectableAreas[i].onHover.execute(x,y,this);
			}
		}
	}
	triggerClick(x,y) {
		for (var i=0; i<this.selectableAreas.length; i++) {
			if (this.selectableAreas[i].containsPoint(x,y)) {
				this.selectableAreas[i].onClick.execute(x,y,this);
			}
		}
	}
}
