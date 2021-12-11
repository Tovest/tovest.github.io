class RequestHandler {
	constructor() {
		this.pendingRequests = [];
	}
	getCurrentRequest() {
		return this.pendingRequests[0];
	}
	addRequest(request) {
		this.pendingRequests.push(request);
	}
	clear() {
		this.pendingRequests = [];
	}
	satisfyRequest(item) {
		if (this.pendingRequests[0].handleItem(item)) {
			this.pendingRequests.shift();
			return true;
		}
		return false;
	}
}

class Request {
	constructor() {};
	checkIfItemSatisfies(item) {
		console.log("This request isn't setup");
		return false;
	};
}
