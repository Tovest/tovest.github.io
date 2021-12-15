class Event {
	constructor() {
		this.connectedTerminal = undefined;
	}
	execute(requestingArea,vertex,canvas) {
		return;
	}
}

class EventLog extends Event {
	constructor(message) {
		super();
		this.message = message;
	}
	execute() {
		this.connectedTerminal.log(new LogStringMessage(this.message));
	}
}
