export class Canvas {
	
	constructor(canvasElement) {
		this.selectableAreas = [];
		this.elements2d = [];
		this.canvasElement = canvasElement;
		this.canvasElement.onmouseover = this.triggerHoverEvent(e);
	}
	triggerHover(x,y) {
		for (let i=0; i<this.selectableAreas.length; i++) {
			if (this.selectableAreas[i].area.containsPoint(x,y)) {
				this.selectableAreas[i].notifyHover(x,y,this);
			}
		}
	}
	triggerHoverEvent(e) {
		for (let i=0; i<this.selectableAreas.length; i++) {
			if (this.selectableAreas[i].area.containsPoint(e.offsetX,e.offsetY)) {
				this.selectableAreas[i].notifyHover(e.offsetX,e.offsetY,this);
			}
		}
	}
	
	addSelectableArea(selectableArea) {
		this.selectableAreas.push(selectableArea);
	}
	addElement2d(element2d) {
		this.element2d.push(element2d);
	}
}
