let TESTOBJS = {}
TESTOBJS.DebugCreationRule = function() {
	let OBJ = Object.create(Graph.CreationRules.DebugCreationRule);
	OBJ.checkedFlag = false;
	OBJ.isCreationRuleSatisfied = function(nodeType,targetHandler,errorRepository) {
		this.checkedFlag = true;
		return true;
	}
	return OBJ;
}
TESTOBJS.DebugCreationEvent = Object.create(Graph.Base.CreationEvent);
TESTOBJS.DebugCreationEvent.executeCreationEvent = function(node) {
	node.masterType.TESTVAR++;
}
TESTOBJS.DebugConnectionEvent = Object.create(Graph.Base.ConnectionEvent)
TESTOBJS.DebugConnectionEvent.executeConnectionEvent = function(connection) {
	connection.getNode2().TESTVAR++;
}
TESTOBJS.DebugDisconnectionEvent = Object.create(Graph.Base.DisconnectionEvent)
TESTOBJS.DebugDisconnectionEvent.executeDisconnectionEvent = function(connection) {
	connection.getNode2().TESTVAR++;
}
TESTOBJS.DebugCreationRule = function(shouldFail = false,errorToAdd = TESTOBJS.SimpleError) {
	let OBJ = Object.create(Graph.Base.CreationRule)
	OBJ.checkedFlag = false;
	OBJ.shouldFail = shouldFail;
	OBJ.errorToAdd = errorToAdd;
	OBJ.isCreationRuleSatisfied = function(nodeType,targetHandler,errorRepository) {
		if (!shouldFail) {
			this.checkedFlag = true;
			return true;
		}
		errorRepository.addError(this.errorToAdd);
		return false
	}
	return OBJ;
}
TESTOBJS.DebugConnectionRule = function(shouldFail = false,errorToAdd = TESTOBJS.SimpleError) {
	let OBJ = Object.create(Graph.Base.ConnectionRule)
	OBJ.checkedFlag = false;
	OBJ.shouldFail = shouldFail;
	OBJ.errorToAdd = errorToAdd;
	OBJ.isConnectionRuleSatisfied = function(node1,node2,errorRepository) {
		if (!shouldFail) {
			this.checkedFlag = true;
			return true;
		}
		errorRepository.addError(this.errorToAdd);
		return false
	}
	return OBJ;
}
TESTOBJS.DebugDisconnectionRule = function(shouldFail = false,errorToAdd = TESTOBJS.SimpleError) {
	let OBJ = Object.create(Graph.Base.DisconnectionRule)
	OBJ.checkedFlag = false;
	OBJ.shouldFail = shouldFail;
	OBJ.errorToAdd = errorToAdd;
	OBJ.isDisconnectionRuleSatisfied = function(connection,errorRepository) {
		if (!shouldFail) {
			this.checkedFlag = true;
			return true;
		}
		errorRepository.addError(this.errorToAdd);
		return false
	}
	return OBJ;
}
TESTOBJS.DebugFailedCreationEvent = Object.create(Graph.Base.FailedCreationEvent);
TESTOBJS.DebugFailedCreationEvent.executeFailedCreationEvent = function(nodeType,targetHandler,errorRepository) {
	nodeType.TESTVAR++;
	for (const error of errorRepository.errorList) error.check();
}
TESTOBJS.DebugFailedConnectionEvent = Object.create(Graph.Base.FailedConnectionEvent)
TESTOBJS.DebugFailedConnectionEvent.executeFailedConnectionEvent = function(node1,node2,errorRepository) {
	node2.TESTVAR++;
	for (const error of errorRepository.errorList) error.check();
}
TESTOBJS.DebugFailedDisconnectionEvent = Object.create(Graph.Base.FailedDisconnectionEvent)
TESTOBJS.DebugFailedDisconnectionEvent.executeFailedDisconnectionEvent = function(connection,errorRepository) {
	connection.TESTVAR++;
	for (const error of errorRepository.errorList) error.check();
}
TESTOBJS.SimpleError = Object.create(Graph.Base.Error);
TESTOBJS.CheckableError = function() {
	let OBJ = Object.create(Graph.Base.Error)
	OBJ.checkFlag = false;
	OBJ.check = function() {
		this.checkFlag = true;
		return true;
	}
	return OBJ;
}
let func = null;



// Setup permission between nodeTypes
func = function() {
	let nodeType1 = new Graph.NodeType();
	let nodeType2 = new Graph.NodeType();
	let permission = nodeType1.allowConnectionsTo(nodeType2);
	if (permission == nodeType1.getPermissionToNodeType(nodeType2) && permission == nodeType2.getPermissionToNodeType(nodeType1)) {
		console.log("( OK ): Setup permission between nodeTypes");
	}
	else console.error("( ER ): Setup permission between nodeTypes");
}
func();



// Node creation, related handler and nodeType output
func = function() {
	let nodeType = new Graph.NodeType();
	nodeType.TESTVAR = 0;
	nodeType.TESTVAR2 = 0;
	nodeType.addCreationEvent(TESTOBJS.DebugCreationEvent);
	let handler = new Graph.Base.Implementation.Handler();
	handler.onNewNodeJoined = function(node) {node.masterType.TESTVAR2++}
	let node = nodeType.newNode(handler);
	if (nodeType.TESTVAR == 1 && nodeType.TESTVAR2 == 1
		&& node != undefined
		&& handler.nodes[0] == node
		&& nodeType.nodes[0] == node
		) {
		console.log("( OK ): Node creation, related handler and nodeType output");
	}
	else console.error("( ER ): Node creation, related handler and nodeType output");
}
func();



// Node connection, related handler and permission output
func = function() {
	let nodeType1 = new Graph.NodeType();
	let nodeType2 = new Graph.NodeType();
	let permission = nodeType1.allowConnectionsTo(nodeType2);
	permission.addConnectionEvent(TESTOBJS.DebugConnectionEvent);
	let handler = new Graph.Base.Implementation.Handler();
	handler.onNewNodeJoined = function(node) {} //No Warning
	handler.onConnectionToNode = function(n1,n2,con) {
		n2.TESTVAR2++;
	}
	let node1 = nodeType1.newNode(handler);
	let node2 = nodeType2.newNode(handler);
	node2.TESTVAR = 0;
	node2.TESTVAR2 = 0;
	let connection = node1.connectTo(node2);
	if (node2.TESTVAR == 1 && node2.TESTVAR2 == 1 
		&& connection != undefined
		&& connection.getNode1().getConnectionToNode(connection.getNode2()) == connection
		&& connection.getNode2().getConnectionToNode(connection.getNode1()) == connection
		) {
		console.log("( OK ): Node connection, related handler and permission output");
	}
	else console.error("( ER ): Node connection, related handler and permission output");
}
func();



// Node disconnection, related handler and permission output
func = function() {
	let nodeType1 = new Graph.NodeType();
	let nodeType2 = new Graph.NodeType();
	let permission = nodeType1.allowConnectionsTo(nodeType2);
	permission.addDisconnectionEvent(TESTOBJS.DebugDisconnectionEvent);
	let handler = new Graph.Base.Implementation.Handler();
	handler.onNewNodeJoined = function(node) {} //No Warning
	handler.onConnectionToNode = function(con) {} //No Warning
	handler.onDisconnectionFromNode = function(n1,n2,con) {
		n2.TESTVAR2++;
	}
	let node1 = nodeType1.newNode(handler);
	let node2 = nodeType2.newNode(handler);
	node2.TESTVAR = 0;
	node2.TESTVAR2 = 0;
	let connection = node1.connectTo(node2);
	let bool = connection.deleteConnection();
	if (node2.TESTVAR == 1 && node2.TESTVAR2 == 1 
		&& bool == true
		&& connection.getNode1().getConnectionToNode(connection.getNode2()) == undefined
		&& connection.getNode2().getConnectionToNode(connection.getNode1()) == undefined
		) {
		console.log("( OK ): Node disconnection, related handler and permission output");
	}
	else console.error("( ER ): Node disconnection, related handler and permission output");
}
func();



// Node creation rules checked
func = function() {
	let nodeType = new Graph.NodeType();
	let testCreationRule1 = new TESTOBJS.DebugCreationRule();
	let testCreationRule2 = new TESTOBJS.DebugCreationRule();
	nodeType.addCreationRule(testCreationRule1);
	nodeType.addCreationRule(testCreationRule2);
	let node = nodeType.newNode();
	if (testCreationRule1.checkedFlag && testCreationRule2.checkedFlag) {
		console.log("( OK ): Node creation rule checked");
	}
	else console.error("( ER ): Node creation rule checked");
}
func();



// Node connection rules checked
func = function() {
	let nodeType1 = new Graph.NodeType();
	let nodeType2 = new Graph.NodeType();
	let permission = nodeType1.allowConnectionsTo(nodeType2);
	let node1 = nodeType1.newNode();
	let node2 = nodeType2.newNode();
	let testConnectionRule1 = new TESTOBJS.DebugConnectionRule();
	let testConnectionRule2 = new TESTOBJS.DebugConnectionRule();
	permission.addConnectionRule(testConnectionRule1);
	permission.addConnectionRule(testConnectionRule2);
	node1.connectTo(node2);
	if (testConnectionRule1.checkedFlag && testConnectionRule1.checkedFlag) {
		console.log("( OK ): Node connection rules checked");
	}
	else console.error("( ER ): Node connection rules checked");
}
func();



// Node disconnection rules checked
func = function() {
	let nodeType1 = new Graph.NodeType();
	let nodeType2 = new Graph.NodeType();
	let permission = nodeType1.allowConnectionsTo(nodeType2);
	let node1 = nodeType1.newNode();
	let node2 = nodeType2.newNode();
	let testDisconnectionRule1 = new TESTOBJS.DebugDisconnectionRule();
	let testDisconnectionRule2 = new TESTOBJS.DebugDisconnectionRule();
	permission.addDisconnectionRule(testDisconnectionRule1);
	permission.addDisconnectionRule(testDisconnectionRule2);
	let connection = node1.connectTo(node2);
	connection.deleteConnection();
	if (testDisconnectionRule1.checkedFlag && testDisconnectionRule2.checkedFlag) {
		console.log("( OK ): Node disconnection rules checked");
	}
	else console.error("( ER ): Node disconnection rules checked");
}
func();



// Failed node creation with failure event and errorRepository
// Creates the errors which are added in errorRepository on failure, the event will check them
// If the events are checked and are in the errorRepository then the test passes
func = function() {
	let errorRepository = new Graph.ErrorRepository();
	let nodeType = new Graph.NodeType();
	nodeType.TESTVAR = 0;
	let testFailEvent1 = new TESTOBJS.CheckableError();
	let testFailEvent2 = new TESTOBJS.CheckableError();
	let testCreationRule1 = new TESTOBJS.DebugCreationRule(true,testFailEvent1);
	let testCreationRule2 = new TESTOBJS.DebugCreationRule(true,testFailEvent2);
	nodeType.addCreationRule(testCreationRule1);
	nodeType.addCreationRule(testCreationRule2);
	nodeType.addFailedCreationEvent(TESTOBJS.DebugFailedCreationEvent);
	let node = nodeType.newNode(undefined,errorRepository);
	if (errorRepository.errorList.includes(testFailEvent1) && errorRepository.errorList.includes(testFailEvent2)
		&& testFailEvent1.checkFlag
		&& testFailEvent2.checkFlag
		&& nodeType.TESTVAR == 1
		&& node == undefined
		) {
		console.log("( OK ): Failed node creation with failure event and errorRepository");
	}
	else console.error("( ER ): Failed node creation with failure event and errorRepository");
}
func();



// Failed node connection with failure event and errorRepository
// Creates the errors which are added in errorRepository on failure, the event will check them
// If the events are checked and are in the errorRepository then the test passes
func = function() {
	let errorRepository = new Graph.ErrorRepository();
	let nodeType1 = new Graph.NodeType();
	let nodeType2 = new Graph.NodeType();
	let permission = nodeType1.allowConnectionsTo(nodeType2);
	let testFailEvent1 = new TESTOBJS.CheckableError();
	let testFailEvent2 = new TESTOBJS.CheckableError();
	let testConnectionRule1 = new TESTOBJS.DebugConnectionRule(true,testFailEvent1);
	let testConnectionRule2 = new TESTOBJS.DebugConnectionRule(true,testFailEvent2);
	permission.addConnectionRule(testConnectionRule1);
	permission.addConnectionRule(testConnectionRule2);
	permission.addFailedConnectionEvent(TESTOBJS.DebugFailedConnectionEvent);
	let node1 = nodeType1.newNode(undefined,errorRepository);
	let node2 = nodeType2.newNode(undefined,errorRepository);
	node2.TESTVAR = 0;
	let connection = node1.connectTo(node2,errorRepository);
	if (errorRepository.errorList.includes(testFailEvent1) && errorRepository.errorList.includes(testFailEvent2)
		&& testFailEvent1.checkFlag
		&& testFailEvent2.checkFlag
		&& node2.TESTVAR == 1
		&& connection == undefined
		) {
		console.log("( OK ): Failed node connection with failure event and errorRepository");
	}
	else console.error("( ER ): Failed node connection with failure event and errorRepository");
}
func();



// Failed node disdisconnection with failure event and errorRepository
// Creates the errors which are added in errorRepository on failure, the event will check them
// If the events are checked and are in the errorRepository then the test passes
func = function() {
	let errorRepository = new Graph.ErrorRepository();
	let nodeType1 = new Graph.NodeType();
	let nodeType2 = new Graph.NodeType();
	let permission = nodeType1.allowConnectionsTo(nodeType2);
	let testFailEvent1 = new TESTOBJS.CheckableError();
	let testFailEvent2 = new TESTOBJS.CheckableError();
	let testDisconnectionRule1 = new TESTOBJS.DebugDisconnectionRule(true,testFailEvent1);
	let testDisconnectionRule2 = new TESTOBJS.DebugDisconnectionRule(true,testFailEvent2);
	permission.addDisconnectionRule(testDisconnectionRule1);
	permission.addDisconnectionRule(testDisconnectionRule2);
	permission.addFailedDisconnectionEvent(TESTOBJS.DebugFailedDisconnectionEvent);
	let node1 = nodeType1.newNode(undefined,errorRepository);
	let node2 = nodeType2.newNode(undefined,errorRepository);
	let connection = node1.connectTo(node2);
	connection.TESTVAR = 0;
	let bool = connection.deleteConnection(errorRepository);
	if (errorRepository.errorList.includes(testFailEvent1) && errorRepository.errorList.includes(testFailEvent2)
		&& testFailEvent1.checkFlag
		&& testFailEvent2.checkFlag
		&& connection.TESTVAR == 1
		&& bool == false
		) {
		console.log("( OK ): Failed node disconnection with failure event and errorRepository");
	}
	else console.error("( ER ): Failed node disconnection with failure event and errorRepository");
}
func();



// Missing connection permission error
func = function() {
	let errorRepository = new Graph.ErrorRepository();
	let nodeType1 = new Graph.NodeType();
	let nodeType2 = new Graph.NodeType();
	let node1 = nodeType1.newNode(undefined,errorRepository);
	let node2 = nodeType2.newNode(undefined,errorRepository);
	let connection = node1.connectTo(node2,errorRepository);
	if (errorRepository.errorList.includes(Graph.Error.MissingConnectionPermission)
		&& connection == undefined
		) {
		console.log("( OK ): Missing connection permission");
	}
	else console.error("( ER ): Missing connection permission");
}
func();



// Reached max connections error
func = function() {
	let errorRepository = new Graph.ErrorRepository();
	let nodeType1 = new Graph.NodeType();
	let nodeType2 = new Graph.NodeType();
	let permission = nodeType1.allowConnectionsTo(nodeType2,1,2);
	let node1_1 = nodeType1.newNode(undefined,errorRepository);
	let node1_2 = nodeType1.newNode(undefined,errorRepository);
	let node2_1 = nodeType2.newNode(undefined,errorRepository);
	let node2_2 = nodeType2.newNode(undefined,errorRepository);
	let node2_3 = nodeType2.newNode(undefined,errorRepository);
	let err = undefined;
	let okFlag = true;
	let correctCounter = 0;
	// Fail 3rd connection when max is 2
	let con1 = node1_1.connectTo(node2_1,errorRepository);
	let con2 = node1_1.connectTo(node2_2,errorRepository);
	correctCounter = (con1 != undefined) + (con2 != undefined);
	correctCounter += (node1_1.connectTo(node2_3,errorRepository) == undefined);
	err = errorRepository.errorList[0];
	if (errorRepository.errorList.length != 1 || correctCounter != 3 || err == undefined || Object.getPrototypeOf(err) != Graph.Base.Error || err.nodeUnableToConnect != node1_1 || err.otherNode != node2_3) {
		console.error("( ER ): Reached max connections error -> connection 1 to 2, 3rd connection despite max 2, connection requested by node without spare possible connections");
	} else {
		console.log("( OK ): Reached max connections error -> connection 1 to 2, 3rd connection despite max 2, connection requested by node without spare possible connections");
	}
	// Fail but connecting node isn't the one that reached max
	correctCounter = 0;
	errorRepository = new Graph.ErrorRepository();
	correctCounter += (node2_3.connectTo(node1_1,errorRepository) == undefined);
	err = errorRepository.errorList[0];
	if (errorRepository.errorList.length != 1 || correctCounter != 1 || err == undefined || Object.getPrototypeOf(err) != Graph.Base.Error || err.nodeUnableToConnect != node1_1 || err.otherNode != node2_3) {
		console.error("( ER ): Reached max connections error -> connection 1 to 2, 3rd connection despite max 2, connection requested by node with spare possible connections");
	} else {
		console.log("( OK ): Reached max connections error -> connection 1 to 2, 3rd connection despite max 2, connection requested by node with spare possible connections");
	}
	// Fail but from other direction 
	correctCounter = 0;
	errorRepository = new Graph.ErrorRepository();
	con1.deleteConnection();
	con2.deleteConnection();
	correctCounter += (node2_2.connectTo(node1_1,errorRepository) != undefined);
	correctCounter += (node2_2.connectTo(node1_2,errorRepository) == undefined);
	err = errorRepository.errorList[0];
	if (errorRepository.errorList.length != 1 || correctCounter != 2 || err == undefined || Object.getPrototypeOf(err) != Graph.Base.Error || err.nodeUnableToConnect != node2_2 || err.otherNode != node1_2) {
		console.error("( ER ): Reached max connections error -> connection 1 to 2, 2nd connection despite max 1, connection requested by node without spare possible connections");
	} else {
		console.log("( OK ): Reached max connections error -> connection 1 to 2, 2nd connection despite max 1, connection requested by node without spare possible connections");
	}
	// Fail but connecting node isn't the one that reached max and it's the other direction
	correctCounter = 0;
	errorRepository = new Graph.ErrorRepository();
	correctCounter += (node1_2.connectTo(node2_2,errorRepository) == undefined);
	err = errorRepository.errorList[0];
	if (errorRepository.errorList.length != 1 || correctCounter != 1 || err == undefined || Object.getPrototypeOf(err) != Graph.Base.Error || err.nodeUnableToConnect != node2_2 || err.otherNode != node1_2) {
		console.error("( ER ): Reached max connections error -> connection 1 to 2, 2nd connection despite max 1, connection requested by node with spare possible connections");
	} else {
		console.log("( OK ): Reached max connections error -> connection 1 to 2, 2nd connection despite max 1, connection requested by node with spare possible connections");
	}
	// Fail both can't connect
	correctCounter = 0;
	errorRepository = new Graph.ErrorRepository();
	correctCounter += (node1_1.connectTo(node2_1,errorRepository) != undefined);
	correctCounter += (node2_3.connectTo(node1_2,errorRepository) != undefined);
	correctCounter += (node2_3.connectTo(node1_1,errorRepository) == undefined);
	err = errorRepository.errorList[0];
	err2 = errorRepository.errorList[1];
	if (err.nodeUnableToConnect == node1_1) { //Error order shouldn't matter, so I force the order for this test
		let temp = err;
		err = err2;
		err2 = err;
	}
	if (errorRepository.errorList.length != 2 || correctCounter != 3 || err == undefined || err2 == undefined 
		|| Object.getPrototypeOf(err) != Graph.Base.Error || err.nodeUnableToConnect != node2_3 || err.otherNode != node1_1
		|| Object.getPrototypeOf(err2) != Graph.Base.Error || err2.nodeUnableToConnect != node1_1 || err2.otherNode != node2_3 
		) {
		console.error("( ER ): Reached max connections error -> connection 1 to 2, both reached max");
	} else {
		console.log("( OK ): Reached max connections error -> connection 1 to 2, both reached max");
	}
}
func();



// Node deletion no errors
func = function() {
	let nodeType1 = new Graph.NodeType();
	let nodeType2 = new Graph.NodeType();
	nodeType1.allowConnectionsTo(nodeType2,1,9999)
	let handler = new Graph.Base.Implementation.Handler();
	handler.onNewNodeJoined = function(node) {} //No Warning
	handler.onConnectionToNode = function(con) {} //No Warning
	handler.onDisconnectionFromNode = function(con) {} //No Warning
	handler.onNodeLeft = function(n) {
		n.TESTVAR++;
	}
	let node1 = nodeType1.newNode(handler);
	node1.TESTVAR = 0;
	let node2_1 = nodeType2.newNode();
	let node2_2 = nodeType2.newNode();
	let node2_3 = nodeType2.newNode();
	let node2_4 = nodeType2.newNode();
	let node2_5 = nodeType2.newNode();
	node1.connectTo(node2_1);
	node1.connectTo(node2_2);
	node1.connectTo(node2_3);
	node1.connectTo(node2_4);
	node1.connectTo(node2_5);
	let okFlag = true;
	if (node1.getConnectionToNode(node2_1) == undefined
		|| node1.getConnectionToNode(node2_2) == undefined
		|| node1.getConnectionToNode(node2_3) == undefined
		|| node1.getConnectionToNode(node2_4) == undefined
		|| node1.getConnectionToNode(node2_5) == undefined
		|| node2_1.getConnectionToNode(node1) == undefined
		|| node2_2.getConnectionToNode(node1) == undefined
		|| node2_3.getConnectionToNode(node1) == undefined
		|| node2_4.getConnectionToNode(node1) == undefined
		|| node2_5.getConnectionToNode(node1) == undefined
		|| handler.nodes[0] != node1
	) {
		okFlag = false;
		console.error("( ER ): Node deletion no errors, node 1 isn't connected to all");
	}
	node1.deleteNode();
	if (node1.getConnectionToNode(node2_1) != undefined
		|| node1.getConnectionToNode(node2_2) != undefined
		|| node1.getConnectionToNode(node2_3) != undefined
		|| node1.getConnectionToNode(node2_4) != undefined
		|| node1.getConnectionToNode(node2_5) != undefined
		|| node2_1.getConnectionToNode(node1) != undefined
		|| node2_2.getConnectionToNode(node1) != undefined
		|| node2_3.getConnectionToNode(node1) != undefined
		|| node2_4.getConnectionToNode(node1) != undefined
		|| node2_5.getConnectionToNode(node1) != undefined
		|| node1.TESTVAR != 1
		|| handler.nodes[0] == node1
	) {
		okFlag = false;
		console.error("( ER ): Node deletion no errors, the connections haven't been deleted");
	}
	if (okFlag) console.log("( OK ): Node deletion no errors");
	
}
func();



// Node deletion with error
func = function() {
	let errorRepository = new Graph.ErrorRepository();
	let nodeType1 = new Graph.NodeType();
	let nodeType2 = new Graph.NodeType();
	let nodeType3 = new Graph.NodeType();
	nodeType1.allowConnectionsTo(nodeType2,1,9999)
	let permission = nodeType1.allowConnectionsTo(nodeType3,1,9999)
	let testFailEvent = new TESTOBJS.CheckableError();
	let testDisconnectionRule = new TESTOBJS.DebugDisconnectionRule(true,testFailEvent);
	permission.addDisconnectionRule(testDisconnectionRule);
	let handler = new Graph.Base.Implementation.Handler();
	handler.onNewNodeJoined = function(node) {} //No Warning
	handler.onConnectionToNode = function(con) {} //No Warning
	handler.onDisconnectionFromNode = function(con) {} //No Warning
	handler.onNodeLeft = function(n) {
		n.TESTVAR++;
	}
	let node1 = nodeType1.newNode(handler);
	node1.TESTVAR = 0;
	let node2_1 = nodeType2.newNode();
	let node2_2 = nodeType2.newNode();
	let node2_3 = nodeType2.newNode();
	let node2_4 = nodeType2.newNode();
	let node3 = nodeType3.newNode();
	node1.connectTo(node2_1);
	node1.connectTo(node2_2);
	node1.connectTo(node2_3);
	node1.connectTo(node2_4);
	node1.connectTo(node3);
	let okFlag = true;
	if (node1.getConnectionToNode(node2_1) == undefined
		|| node1.getConnectionToNode(node2_2) == undefined
		|| node1.getConnectionToNode(node2_3) == undefined
		|| node1.getConnectionToNode(node2_4) == undefined
		|| node1.getConnectionToNode(node3) == undefined
		|| node2_1.getConnectionToNode(node1) == undefined
		|| node2_2.getConnectionToNode(node1) == undefined
		|| node2_3.getConnectionToNode(node1) == undefined
		|| node2_4.getConnectionToNode(node1) == undefined
		|| node3.getConnectionToNode(node1) == undefined
		|| handler.nodes[0] != node1
	) {
		okFlag = false;
		console.error("( ER ): Node deletion with errors, node 1 isn't connected to all");
	}
	node1.deleteNode(errorRepository);
	if (node1.getConnectionToNode(node2_1) == undefined
		|| node1.getConnectionToNode(node2_2) == undefined
		|| node1.getConnectionToNode(node2_3) == undefined
		|| node1.getConnectionToNode(node2_4) == undefined
		|| node1.getConnectionToNode(node3) == undefined
		|| node2_1.getConnectionToNode(node1) == undefined
		|| node2_2.getConnectionToNode(node1) == undefined
		|| node2_3.getConnectionToNode(node1) == undefined
		|| node2_4.getConnectionToNode(node1) == undefined
		|| node3.getConnectionToNode(node1) == undefined
		|| node1.TESTVAR != 0
		|| handler.nodes[0] != node1
		|| errorRepository.errorList.length != 1
	) {
		okFlag = false;
		console.error("( ER ): Node deletion with errors, the connections have changed");
	}
	if (okFlag) console.log("( OK ): Node deletion with errors");
	
}
func();