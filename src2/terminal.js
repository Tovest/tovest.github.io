class Terminal {
	constructor(workplace) {
		this.workplace = workplace;
		this.currentRequest = new RequestDefault();
	}
	log(logNode) {}
	finalizeRequest() {
		//Alert or something
		this.currentRequest = new RequestDefault();
		this.workplace.render();
	}
	takeStringInput(string) {
		var tokens = string.split(' ');
		for (var i=0; i<tokens.length-1; i++) {
			this.currentRequest.inputString(tokens[i],this);
		}
		this.currentRequest.inputString(tokens[tokens.length-1],this);
		this.currentRequest.logStatus(this);
	}
	takeVertexInput(vertex) {
		this.currentRequest.inputVertex(vertex,this);
	}
}

class TerminalHTML extends Terminal {
	constructor(inputID,paragraphID,workplace) {
		super(workplace);
		this.inputElement = document.getElementById(inputID);
		this.inputElement.handler = this;
		this.inputElement.onkeypress = function(e) {if (e.keyCode == 13) {e.target.handler.takeStringInput(e.target.value); e.target.value = "";};};
		this.paragraph = document.getElementById(paragraphID);
	}
	log(logNode) {
		this.paragraph.innerHTML = logNode.logToString()+"</br>"+this.paragraph.innerHTML;
	}
}

class Log {
	constructor() {}
	logToString() {
		return "This is a generic log node";
	}
}

class LogStringMessage extends Log {
	constructor(message) {
		super();
		this.message = message;
	}
	logToString() {
		return this.message;
	}
}

class Request {
	logStatus(terminal) {
		terminal.log(new LogStringMessage("Status: ???"));
	}
	inputString(string,terminal) {
		terminal.log(new LogStringMessage("Current request can't handle strings"));
	}
	inputFloat(float,terminal) {
		terminal.log(new LogStringMessage("Current request can't handle floats"));
	}
	inputVector3d(vector3d,terminal) {
		terminal.log(new LogStringMessage("Current request can't handle vector3d"));
	}
	inputVertex(vertex,terminal) {
		terminal.log(new LogStringMessage("Current request can't handle verticies"));
	}
}

class RequestDefault extends Request {
	constructor() {}
	inputString(string,terminal) {
		switch(string) {
			case "snap":
				terminal.currentRequest = new RequestSnapPoint();
				break;
			case "consolelog":
				terminal.currentRequest = new RequestConsoleLog("Log:");
				break;
		}
	}
}

class RequestConsoleLog extends Request {
	constructor(pretext) {
		this.pretext = pretext;
	}
	logStatus(terminal) {
		terminal.log(new LogStringMessage("Status: Awaiting string to log into console"));
	}
	inputString(string,terminal) {
		console.log(this.pretext, string);
		terminal.finalizeRequest();
	}
	inputVertex(vertex,terminal) {
		terminal.log(new LogStringMessage("Vertex input not supported"));
	}
}

class RequestFloat extends Request {
	constructor(requester) {
		this.requester = requester;
	}
	logStatus(terminal) {
		terminal.log(new LogStringMessage("Status: Request Float"));
	}
	inputString(string,terminal) {
		var value = parseFloat(string);
		if (isNaN(value)) {
			terminal.log(new LogStringMessage("NaN: parse failed"));
			terminal.finalizeRequest();
		}
		this.requester.inputFloat(string,terminal);
	}
}

class RequestVector3d extends Request {
	constructor(requester) {
		this.requester = requester;
		this.floatRequester = new RequestFloat(this);
		this.floatsRecieved = 0;
		this.results = [0,0,0];
	}
	logStatus(terminal) {
		terminal.log(new LogStringMessage("Status: Request Vector3d"));
	}
	inputString(string,terminal) {
		this.floatRequester.inputString(string,terminal);
	}
	inputFloat(value,terminal) {
		this.results[this.floatsRecieved] = value;
		this.floatsRecieved += 1;
		if (this.floatsRecieved == 3) {
			this.requester.inputVector3d(new Vector3d(this.results[0],this.results[1],this.results[2]), terminal);
		}
	}
}

class RequestSnapPoint extends Request {
	constructor() {
		this.vector3dRequester = new RequestVector3d(this);
	}
	logStatus(terminal) {
		terminal.log(new LogStringMessage("Status: Request Snap Point"));
	}
	inputString(string,terminal) {
		this.vector3dRequester.inputString(string,terminal);
	}
	inputVector3d(vector3d,terminal) {
		terminal.workplace.entityList.push(SnapPointEntity.create(vector3d.x,vector3d.y,vector3d.z));
		terminal.finalizeRequest();
	}
	inputVertex(vertex,terminal) {
		terminal.workplace.entityList.push(new SnapPointEntity(vertex));
		terminal.finalizeRequest();
	}
}
