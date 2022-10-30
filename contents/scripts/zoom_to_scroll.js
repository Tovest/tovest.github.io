ScrollToZoom = {}

ScrollToZoom.turnElement = function(element,moveChildrenToCam = false) {
	
	//Create cam
	let cam = document.createElement("div");
	cam.style.overflow = "visible";
	cam.style.width = "inherit";
	cam.style.height = "inherit";
	
	//Pass the element's children to cam
	if (moveChildrenToCam) {
		let list = [];
		for (const child of element.children) {list.push(child)};
		for (const child of list) {cam.appendChild(child)};
	}
	element.appendChild(cam);
	
	//Setup fields
	element.cam = cam;
	cam.deltaScrollAmmount = 0.1;
	cam.camZoom = 1;
	cam.camX = 0;
	cam.camY = 0;
	
	//Cam methods
	cam.updateTransform = function() {
		this.style.transform = "scale(" + 1/this.camZoom + ") translate(" + (-this.camX) + "px," + (-this.camY) + "px)";
	}
	cam.moveCam = function(tx,ty) {
		this.camX += tx;
		this.camY += ty;
		this.updateTransform();
	}
	cam.changeZoom = function(tz) {
		this.camZoom += tz;
		this.updateTransform();
	}
	
	//Update element
	element.addEventListener("wheel", ScrollToZoom.Function.zoomWhenScrollFunction);
	element.addEventListener("mousedown", ScrollToZoom.Function.startMovingCam);
	element.addElementWithPageCoords = ScrollToZoom.Function.addElementWithPageCoords;
	element.addElement = ScrollToZoom.Function.addElement;
}



////
//// Utility functions
////
ScrollToZoom.Function = {}



//
// Function to change the camera's zoom
//
//Element's event
ScrollToZoom.Function.zoomWhenScrollFunction = function(e) {
	this.cam.camZoom -= (2*(e.deltaY<0)-1)*this.cam.deltaScrollAmmount;
	if (this.cam.camZoom <= 0.2) this.cam.camZoom = 0.2;
	this.cam.updateTransform();
}



//
// Function to append elements directly to cam
//
//Element's event
ScrollToZoom.Function.addElementWithPageCoords = function(element,posX,posY,offsetX,offsetY) {
	this.cam.appendChild(element);
	element.style.left = this.cam.camX + this.cam.offsetWidth/2 + (posX-this.cam.offsetWidth/2)*this.cam.camZoom -offsetX + "px";
	element.style.top = this.cam.camY + this.cam.offsetHeight/2 + (posY-this.cam.offsetHeight/2)*this.cam.camZoom -offsetY + "px";
}
//Element's event
ScrollToZoom.Function.addElement = function(element,posX,posY,offsetX,offsetY) {
	this.cam.appendChild(element);
	element.style.left = posX-offsetX + "px";
	element.style.top = posY-offsetY + "px";
}



//
// Functions to move the camera when scroll wheel is pressed
//
document.currentlyMovingCam = undefined;
//Element's event
ScrollToZoom.Function.startMovingCam = function(e) {
	if (e.buttons==4) {
		document.currentlyMovingCam = this.cam;
		document.addEventListener("mousemove", ScrollToZoom.Function.moveCam);
		document.addEventListener("mouseup", ScrollToZoom.Function.stopMovingCam);
	}
}
//Document's event
ScrollToZoom.Function.moveCam = function(e) {
	if (e.buttons==4) {
		this.currentlyMovingCam.moveCam(-e.movementX*this.currentlyMovingCam.camZoom,-e.movementY*this.currentlyMovingCam.camZoom);
	}
}
//Document's event
ScrollToZoom.Function.stopMovingCam = function(e) {
	this.currentlyMovingCam = undefined;
	this.removeEventListener("mousemove", ScrollToZoom.Function.moveCam);
	this.removeEventListener("mouseup", ScrollToZoom.Function.stopMovingCam);
}