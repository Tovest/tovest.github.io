class Canvas {
	constructor(canvasElement, camera) {
		this.canvasElement = canvasElement;
		this.activeCamera = camera;
	}
	render(entityList) {
		for (var entity in entityList) {
			entity.translateToCanvas(this.activeCamera,this);
		}
	}
}
