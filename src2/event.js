class Event {
	constructor() {}
	execute(requestingArea,x,y,canvas) {
		return;
	}
}

class EventConsoleLog extends Event {
	constructor(message) {
		super();
		this.message = message;
	}
	execute(requestingArea,x,y,canvas) {
		console.log(this.message,x,y);
	}
}
