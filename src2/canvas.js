class Canvas {
	constructor(canvasElement, camera) {
		this.selectableAreas = [];
		this.elements2d = [];
		this.canvasElement = canvasElement;
		this.activeCamera = camera;
	}
	render(entityList) {
		for (var entity in entityList) {
			entity.translateToCanvas(this.activeCamera,this);
		}
	}
	addSelectableArea(selectableArea) {
		this.selectableAreas.push(selectableArea);
	}
	addElement2d(element2d) {
		this.element2d.push(element2d);
	}
	triggerHover(x,y) {
		for (var selectableArea in this.selectableAreas) {
			if (selectableArea.area.containsPoint(x,y)) {
				selectableArea.notifyHover(x,y,this);
			}
		}
	}
	triggerClick(x,y) {
		for (var selectableArea in this.selectableAreas) {
			if (selectableArea.area.containsPoint(x,y)) {
				selectableArea.notifyClick(x,y,this);
			}
		}
	}
}
