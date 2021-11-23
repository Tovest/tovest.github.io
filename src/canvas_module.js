export class Canvas {
	constructor() {
		this.selectableAreas = [];
		this.elements2d = [];
	}
	onHover(x,y) {
		for (let i=0; i<this.selectableAreas.length; i++) {
			if (this.selectableAreas[i].containsPoint(x,y)) {
				this.selectableAreas[i].notifyHover(x,y);
			}
		}
	}
}
