class Terminal {
	constructor(inputID,workplace) {
		this.inputElement = document.getElementById(inputID);
		this.inputElement.handler = this;
		this.inputElement.onkeypress = function(e) {if (e.keyCode == 13) {e.target.handler.takeStringInput(e.target.value); e.target.value = "";};};
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
		for (var i=0; i<tokens.length; i++) {
			this.currentRequest.inputString(tokens[i],this);
		}
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

class RequestNewRequest { //Implements Request (inputs methods)
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

class RequestConsoleLog { //Implements Request (input methods)
	constructor(pretext) {
		this.pretext = pretext;
	}
	inputString(string,terminal) {
		console.log(this.pretext, string);
		terminal.finalizeRequest();
	}
}

class RequestFloat { //Implements Request (input methods)
	constructor(requester) {
		this.requester = requester; //Implements ValueReceiver (receiveFloat method)
	}
	inputString(string,terminal) {
		var value = parseFloat(string); //I'll avoid using type conversion
		if (isNaN(value)) {
			terminal.submitError(new LogStringMessage("NaN: parse failed"));
			terminal.finalizeRequest();
		}
		this.requester.receiveFloat(string,terminal);
	}
}

class RequestVector3d { //Implements Request (input methods) and FloatReceiver (receiveFloat method)
	constructor(requester) {
		this.requester = requester; //Implements Vector3dReceiver (receiveVector3d method)
		this.subRequests = [new RequestFloat(this),new RequestFloat(this),new RequestFloat(this)]
		this.currentRequestIndex = 0;
		this.results = [0,0,0];
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
}

class RequestSnapPoint { //Implements Request (input methods) Vector3dReceiver (receiveVector3d method)
	constructor() {
		this.vector3dRequester = new RequestVector3d(this);
	}
	inputString(string,terminal) {
		this.vector3dRequester.inputString(string,terminal);
	}
	receiveVector3d(vector3d,terminal) {
		terminal.workplace.entityList.push(SnapPointEntity.create(vector3d.x,vector3d.y,vector3d.z));
		terminal.finalizeRequest();
	}
}
