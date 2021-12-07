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
	execute() {
		console.log(this.message);
	}
}
