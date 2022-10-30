pxToNum = function(string) {
	return parseFloat(string.replace("px",""));
}

createError = function(errorString) {
	let element = document.createElement("li");
	element.innerText = errorString;
	element.classList.add("error");
	document.getElementById("errorRepository").appendChild(element);
}

let board = document.getElementById("board");
ScrollToZoom.turnElement(board,false);

let addButton = document.getElementById("addButton");
let palette = document.getElementById("palette");
palette.selectedNodeTypeElement = undefined;
palette.selectedNodeTypeElementForPermission = undefined;
gloablConnectionCounter = 0;
paletteEnabled = true;

addButton.addEventListener("mousedown",function(e) {
	let newNodeTypeElement = document.createElement("div");
	//
	newNodeTypeElement.typeOfNode = new Graph.NodeType();
	newNodeTypeElement.typeOfNode.element = newNodeTypeElement;
	//
	newNodeTypeElement.classList.add("nodeType");
	newNodeTypeElement.color = getRandomColor();
	newNodeTypeElement.style.backgroundColor = newNodeTypeElement.color;
	palette.appendChild(newNodeTypeElement);
	newNodeTypeElement.addEventListener("mousedown", selectNewNodeTypeElement);
	newNodeTypeElement.addEventListener("contextmenu", disableContextMenu);
});
selectNewNodeTypeElement = function(e) {
	if (paletteEnabled) {
		if (e.buttons == 1) {
			if (palette.selectedNodeTypeElement == this) {
				this.classList.remove("selected")
				palette.selectedNodeTypeElement = undefined;
				return
			}
			if (palette.selectedNodeTypeElement != undefined) palette.selectedNodeTypeElement.classList.remove("selected");
			palette.selectedNodeTypeElement = this;
			palette.selectedNodeTypeElement.classList.add("selected");
		}
		if (e.buttons == 2) {
			if (palette.selectedNodeTypeElementForPermission == undefined) {
				palette.selectedNodeTypeElementForPermission = this;
				this.classList.add("selected2");
			} else if (palette.selectedNodeTypeElementForPermission == this) {
				this.classList.remove("selected2")
				palette.selectedNodeTypeElementForPermission = undefined;
				return
			} else {
				gloablConnectionCounter++;
				palette.selectedNodeTypeElementForPermission.classList.remove("selected2");
				document.getElementById("permissionHandler").classList.add("visible");
				document.getElementById("submitPermission").nodeType1Element = palette.selectedNodeTypeElementForPermission;
				document.getElementById("submitPermission").nodeType2Element = this;
				document.getElementById("permissionHandler").style.backgroundImage = "linear-gradient(to right," + palette.selectedNodeTypeElementForPermission.color + "," + this.color + ")";
				paletteEnabled = false;
				palette.selectedNodeTypeElementForPermission.classList.remove("selected2");
				palette.selectedNodeTypeElementForPermission = undefined;
			}
		}
	}
}
document.getElementById("submitPermission").addEventListener("click", function(e) {
	if (paletteEnabled == false) {
		let type1 = this.nodeType1Element.typeOfNode;
		let type2 = this.nodeType2Element.typeOfNode;
		let maxConToType1 = document.getElementById("type1max").value;
		let maxConToType2 = document.getElementById("type2max").value;
		let permission = type1.allowConnectionsTo(type2,maxConToType1,maxConToType2);
		if (permission != undefined) {
			permission.addConnectionEvent(createConnectionElementEvent);
			permission.addDisconnectionEvent(deleteAssociatedConnectionElement);
			//First text
			let temp = document.createElement("div");
			temp.innerText = ("C:" + gloablConnectionCounter + "-M:" + maxConToType2);
			temp.classList.add("connectionText")
			temp.style.color = this.nodeType2Element.color;
			this.nodeType1Element.appendChild(temp);
			//Second text
			temp = document.createElement("div");
			temp.innerText = ("C:" + gloablConnectionCounter + "-M:" + maxConToType1);
			temp.style.color = this.nodeType1Element.color;
			temp.classList.add("connectionText")
			this.nodeType2Element.appendChild(temp);
		} else {
			createError("Permission already set");
		}
		document.getElementById("permissionHandler").classList.remove("visible");
		paletteEnabled = true;
	}
});
document.getElementById("closeButton").addEventListener("click", function(e) {
	paletteEnabled = true;
	document.getElementById("permissionHandler").classList.remove("visible");
	document.getElementById("submitPermission").nodeType1Element = undefined;
	document.getElementById("submitPermission").nodeType2Element = undefined;
});


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

createNodeElement = function(nodeTypeElement,posX,posY) {
	let nodeElement = document.createElement("div");
	nodeElement.classList.add("node");
	nodeElement.style.width = "25px";
	nodeElement.style.height = "25px";
	nodeElement.nodeTypeElement = nodeTypeElement;
	nodeElement.style.zIndex = 3;
	//
	nodeElement.nodeObj = nodeTypeElement.typeOfNode.newNode();
	nodeElement.nodeObj.element = nodeElement;
	//
	nodeElement.style.backgroundColor = nodeTypeElement.color;
	board.addElementWithPageCoords(nodeElement,posX,posY,pxToNum(nodeElement.style.width)/2,pxToNum(nodeElement.style.height)/2);
	nodeElement.addEventListener("mousedown",nodeClick);
	return nodeElement;
}

board.addEventListener("mousedown", function(e){
	if (palette.selectedNodeTypeElement != undefined && e.buttons == 1) createNodeElement(palette.selectedNodeTypeElement,e.pageX,e.pageY);
});

board.selectedNode = undefined
nodeClick = function(e) {
	e.stopPropagation();
	if (e.buttons == 1) {
		if (board.selectedNode == undefined) {
			board.selectedNode = this;
			board.selectedNode.classList.add("selected");
		} else if (board.selectedNode == this) {
			this.classList.remove("selected");
			board.selectedNode = undefined;
		} else {
			let errorRepository = new Graph.ErrorRepository();
			let connection = board.selectedNode.nodeObj.connectTo(this.nodeObj,errorRepository);
			if (connection == undefined) {
				for (const error of errorRepository.errorList) {
					createError(error.message);
				}
			}
			board.selectedNode.classList.remove("selected");
			board.selectedNode = undefined;
		}
	} else if (e.buttons == 2) {
		if (board.selectedNode == this) board.selectedNode = undefined;
		this.remove();
		if (!this.nodeObj.deleteNode()) {
			createError("This node can't be deleted"); //Currently impossible
		}
		board.addEventListener("contextmenu", disableContextMenu);
		board.addEventListener("contextmenu", removeDisableContextMenu);
	}
}
disableContextMenu = function(e) {
	e.preventDefault();
}
removeDisableContextMenu = function(e) {
	board.removeEventListener("contextmenu",disableContextMenu);
	board.removeEventListener("contextmenu",removeDisableContextMenu);
}



///////



createConnectionElementEvent = Object.create(Graph.Base.ConnectionEvent);
createConnectionElementEvent.executeConnectionEvent = function(connection) {
	connection.element = document.createElementNS("http://www.w3.org/2000/svg",'svg');
	connection.elementLine = document.createElementNS("http://www.w3.org/2000/svg",'line');
	connection.elementLine.setAttribute("style","stroke:" + connection.getNode1().masterType.element.color + ";stroke-width:5");
	connection.elementLine.classList.add("line");
	connection.element.appendChild(connection.elementLine);
	connection.element.style.position = "absolute";
	connection.element.style.zIndex = 1;
	connection.element.style.visibility = "hidden";
	connection.elementLine.style.zIndex = 2;
	connection.elementLine.style.visibility = "visible";
	
	let node1elem = connection.getNode1().element;
	let node2elem = connection.getNode2().element;
	let padding = 5;
	
	let n1x = pxToNum(node1elem.style.left)+pxToNum(node1elem.style.width)/2;
	let n1y = pxToNum(node1elem.style.top)+pxToNum(node1elem.style.height)/2;
	let n2x = pxToNum(node2elem.style.left)+pxToNum(node2elem.style.width)/2;
	let n2y = pxToNum(node2elem.style.top)+pxToNum(node2elem.style.height)/2;
	
	let coordLeft = Math.min( pxToNum(node1elem.style.left)+pxToNum(node1elem.style.width)/2 , pxToNum(node2elem.style.left)+pxToNum(node2elem.style.width)/2 );
	let coordTop = Math.min( pxToNum(node1elem.style.top)+pxToNum(node1elem.style.height)/2 , pxToNum(node2elem.style.top)+pxToNum(node2elem.style.height)/2 );
	let coordRight = Math.max( pxToNum(node1elem.style.left)+pxToNum(node1elem.style.width)/2 , pxToNum(node2elem.style.left)+pxToNum(node2elem.style.width)/2 );
	let coordBottom = Math.max( pxToNum(node1elem.style.top)+pxToNum(node1elem.style.height)/2 , pxToNum(node2elem.style.top)+pxToNum(node2elem.style.height)/2 );
	
	connection.element.style.width = "" + coordRight-coordLeft + 2*padding + "px";
	connection.element.style.height = "" + coordBottom-coordTop + 2*padding + "px";
	
	if ( (n1x < n2x && n1y < n2y) || (n2x < n1x && n2y < n1y) ) { //Top-left to Bottom-right
		connection.elementLine.setAttribute("x1",padding);
		connection.elementLine.setAttribute("y1",padding);
		connection.elementLine.setAttribute("x2",padding+coordRight-coordLeft);
		connection.elementLine.setAttribute("y2",padding+coordBottom-coordTop);
	} else { //Bottom-left to Top-right
		connection.elementLine.setAttribute("x1",padding);
		connection.elementLine.setAttribute("y1",padding+coordBottom-coordTop);
		connection.elementLine.setAttribute("x2",padding+coordRight-coordLeft);
		connection.elementLine.setAttribute("y2",padding);
	}
	
	board.addElement(connection.element,coordLeft-padding,coordTop-padding,0,0);
	
	//
	connection.elementLine.associatedConnection = connection;
	connection.elementLine.fatherElement = connection.element;
	//
	connection.elementLine.addEventListener("mousedown",deleteMyConnection);
}

deleteAssociatedConnectionElement = Object.create(Graph.Base.DisconnectionEvent);
deleteAssociatedConnectionElement.executeDisconnectionEvent = function(connection) {
	connection.element.remove();
}

deleteMyConnection = function(e) {
	if (e.buttons == 2) {
		this.associatedConnection.deleteConnection();
		this.fatherElement.remove();
		board.addEventListener("contextmenu", disableContextMenu);
		board.addEventListener("contextmenu", removeDisableContextMenu);
	}
}