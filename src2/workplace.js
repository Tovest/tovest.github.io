class Workplace {
	constructor(entityList,canvas) {
		this.entityList = entityList;
		this.canvas = canvas;
	}
	render() {
		this.canvas.render(this.entityList);
	}
}
