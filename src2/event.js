class Event {
	constructor() {}
	execute(requestingArea,vertex,canvas) {
		return;
	}
}

class EventConsoleLog extends Event {
	constructor(message) {
		super();
		this.message = message;
	}
	execute(requestingArea,vertex,canvas) {
		console.log(this.message,vertex.x,vertex.y,vertex.z);
	}
}
