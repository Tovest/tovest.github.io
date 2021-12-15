class Workplace {
	constructor(entityList,canvas) {
		this.entityList = entityList;
		this.canvas = canvas;
	}
	render(terminal) {
		this.canvas.render(this.entityList,terminal);
	}
}
