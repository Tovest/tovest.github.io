class Terminal {
	constructor(workplace) {
		this.workplace = workplace;
		this.currentRequest = undefined;
		this.errorList = [];
	}
	submitError(errorNode) {
		//Alert or something
		this.errorList.push(errorNode);
	}
	finalizeRequest() {
		//Alert or something
		this.currentRequest = undefined;
	}
	takeStringInput(string) {
		var tokens = string.split(' ');
		for (var i=0; i<tokens.length; i++) {
			this.currentRequest.inputString(tokens[i],this);
		}
	}
}

class ErrorNode {
	constructor() {}
	errorToString() {
		return "This is a generic error node";
	}
}

class ErrorStringMessage extends ErrorNode {
	constructor(message) {
		super();
		this.message = message;
	}
	errorToString() {
		return this.message;
	}
}

class RequestConsoleLog { //Implements Request (input methods)
	inputString(string,terminal) {
		console.log(string);
		terminal.finalizeRequest();
	}
}

class RequestFloat { //Implements Request (input methods)
	constructor(requester) {
		this.requester = requester; //Implements ValueReceiver (receiveFloat method)
	}
	inputString(string,terminal) {
		console.log("inputString requestFloat gotHere")
		var value = parseFloat(string); //I'll avoid using type conversion
		console.log(value);
		if (isNaN(value)) {
			terminal.submitError(new ErrorStringMessage("NaN: parse failed for", this));
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
		console.log("inputString requestVector3d gotHere");
		if (this.currentRequestIndex == this.subRequests.length) {
			this.requester.receiveVector3d(new Vector3d(this.results[0],this.results[1],this.results[2]));
		}
		this.subRequests[this.currentRequestIndex].inputString(string,terminal);
	}
	receiveFloat(value,terminal) {
		console.log("receiveFloat gotHere");
		this.results[this.currentRequestIndex] = value;
		this.currentRequestIndex += 1;
	}
}

class RequestSnapPoint { //Implements Request (input methods) Vector3dReceiver (receiveVector3d method)
	constructor() {
		this.vector3dRequester = new RequestVector3d(this);
	}
	inputString(string,terminal) {
		console.log("inputString requestSnapPoint gotHere");
		this.vector3dRequester.inputString(string,terminal);
	}
	receiveVector3d(vector3d,terminal) {
		console.log("receiveVector3d gotHere");
		terminal.workplace.entityList.push(EntitySnapPoint.create(vector3d.x,vector3d.y,vector3d.z));
		terminal.finalizeRequest();
	}
}
	
