class Workplace {
	constructor(entityList,canvas) {
		this.entityList = entityList;
		this.canvas = canvas;
		this.requestHandler = undefined;
	}
	render() {
		this.canvas.render(this.entityList);
	}
}
