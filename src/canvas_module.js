export class Canvas {
	constructor() {
		this.selectableAreas = [];
		this.elements2d = [];
	}
	onHover(x,y) {
		for (let i=0; i<this.selectableAreas.length; i++) {
			if (this.selectableAreas[i].area.containsPoint(x,y)) {
				this.selectableAreas[i].notifyHover(x,y,this);
			}
		}
	}
	addElement2d(element2d) {
		this.element2d.push(element2d);
	}
}
