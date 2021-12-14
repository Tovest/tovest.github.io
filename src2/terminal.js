class Terminal {
	constructor(workplace) {
		this.workplace = workplace;
		this.currentRequest = new RequestNewRequest();
		this.logs = [];
	}
	log(logNode) {
		//Alert or something
		this.logs.push(logNode);
	}
	finalizeRequest() {
		//Alert or something
		this.currentRequest = new RequestNewRequest();
	}
	takeStringInput(string) {
		var tokens = string.split(' ');
		console.log(tokens);
		if (tokens.length == 0) this.log(new LogStringMessage("No string input"));
		for (var i=0; i<tokens.length-1; i++) {
			this.currentRequest.inputString(tokens[i],this);
		}
		this.currentRequest.inputString(tokens[tokens.length],this);
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
		this.paragraph.innerHTML += (logNode.logToString()+"</br>")
		this.currentRequest = new RequestNewRequest();
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

class RequestNewRequest { //Implements Request (inputs and log methods)
	constructor() {}
	logStatus(terminal) {}
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
	inputVertex(vertex,terminal) {
		terminal.log(new LogStringMessage("Vertex input not supported"));
	}
}

class RequestConsoleLog { //Implements Request (inputs and log methods)
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

class RequestFloat { //Implements Request (inputs and log methods)
	constructor(requester) {
		this.requester = requester; //Implements ValueReceiver (receiveFloat method)
	}
	logStatus(terminal) {
		terminal.log(new LogStringMessage("Status: Request Float"));
	}
	inputString(string,terminal) {
		var value = parseFloat(string); //I'll avoid using type conversion
		if (isNaN(value)) {
			terminal.log(new LogStringMessage("NaN: parse failed"));
			terminal.finalizeRequest();
		}
		this.requester.receiveFloat(string,terminal);
	}
	inputVertex(vertex,terminal) {
		terminal.log(new LogStringMessage("Vertex input not supported"));
	}
}

class RequestVector3d { //Implements Request (inputs and log methods) and FloatReceiver (receiveFloat method)
	constructor(requester) {
		this.requester = requester; //Implements Vector3dReceiver (receiveVector3d method)
		this.subRequests = [new RequestFloat(this),new RequestFloat(this),new RequestFloat(this)]
		this.currentRequestIndex = 0;
		this.results = [0,0,0];
	}
	logStatus(terminal) {
		terminal.log(new LogStringMessage("Status: Request Vector3d"));
	}
	inputString(string,terminal) {
		this.subRequests[this.currentRequestIndex].inputString(string,terminal);
	}
	receiveFloat(value,terminal) {
		this.results[this.currentRequestIndex] = value;
		this.currentRequestIndex += 1;
		if (this.currentRequestIndex == this.subRequests.length) {
			this.requester.receiveVector3d(new Vector3d(this.results[0],this.results[1],this.results[2]), terminal);
		}
	}
	inputVertex(vertex,terminal) {
		this.requester.receiveVector3d(new Vector3d(vertex.x,vertex.y,vertex.z));
	}
}

class RequestSnapPoint { //Implements Request (inputs and log methods) Vector3dReceiver (receiveVector3d method)
	constructor() {
		this.vector3dRequest = new RequestVector3d(this);
	}
	logStatus(terminal) {
		terminal.log(new LogStringMessage("Status: Request Snap Point"));
	}
	inputString(string,terminal) {
		this.vector3dRequest.inputString(string,terminal);
	}
	receiveVector3d(vector3d,terminal) {
		terminal.workplace.entityList.push(SnapPointEntity.create(vector3d.x,vector3d.y,vector3d.z));
		terminal.finalizeRequest();
	}
	inputVertex(vertex,terminal) {
		terminal.workplace.entityList.push(new SnapPointEntity(vertex));
		terminal.finalizeRequest();
	}
}
