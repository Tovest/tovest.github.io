<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		
<!-- -- -- -- -- HEAD -- -- -- -- -->

<link rel="stylesheet" href="./graph_system_style.css">
<title>Box Of Features</title>

<!-- -- -- -- -- /HEAD -- -- -- -- -->

	</head>
	<body>

<!-- -- -- -- -- BODY -- -- -- -- -->

	<div id="board">
		<div>Zoomable Board:</div>
	</div>
	<div id="palette">
		<div>Palette:</div>
		<div id="addButton"></div>
	</div>
	<div id="infoBar">
		<span class="title">Graph system</span>
		<span class="description">
		This is a showcase of a graph system based on NodeTypes. Each NodeType needs a "permission" so that its nodes can connect
		to other nodes and you can easily define events for node creation, connections and disconnections (This showcase uses the events to
		setup the HTML elements).
		</span>
		<span class="title">Scroll To Zoom</span>
		<span class="description">
		The big rectangle (called "board") has a special feature: when scrolling instead of the children elements moving up and down, the element
		will act as a camera allowing you to zoom in and out with the scroll wheel; you can also move the camera by pressing the scroll wheel.
		</span>
		<span class="title">Tutorial</span>
		<span class="description">
		♦ Press the green button to add a new NodeType to the palette <br>
		♦ Click a NodeType to select it, you can now click on the board to place a node of that type <br>
		♦ Click the selected NodeType to de-select it <br>
		♦ Right-Click two NodeTypes to create a "permission" between them so that nodes can connect to each other, you'll be promted to insert the max number of connections to each type <br>
		♦ Click two nodes on the board to connect them (if possible) <br>
		♦ Right-Click a node to delete it and its connections <br>
		♦ Right-Click a connection to delete it <br>
		♦ Scroll on the board to zoom in and out <br>
		♦ Click the scroll-wheel while on the board to move the camera <br>
		</span>
	</div>
	<div id="console">
		<div>Errors:</div>
		<ul id="errorRepository">
		</ul>
	</div>
	<div id="permissionHandler">
		<div id="permissionTitle">Set relationship type:</div>
		<div id="permissionText">-TO-</div>
		<input id="type1max" type="text"></input>
		<input id="type2max" type="text"></input>
		<button id="submitPermission">Create Permission</button>
		<div id="closeButton">X</div>
	</div>
	<script src="./scripts/graph.js"></script>
	<script src="./scripts/graph_tests.js"></script>
	<script src="./scripts/zoom_to_scroll.js"></script>
	<script src="./scripts/main.js"></script>

<!-- -- -- -- -- /BODY -- -- -- -- -->

	</body>
</html>

