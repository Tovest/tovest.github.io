var canvas = new Canvas2d("canvas", new CameraOrtho(0,0,0,0,0,0));
var snapPoint1 = SnapPointEntity.create(-50,20,30);
var snapPoint2 = SnapPointEntity.create(50,20,10);
var line = new LineEntity(snapPoint1,snapPoint2);
var workplace = new Workplace([snapPoint1,snapPoint2,line],canvas);

workplace.render();

var button1 = document.getElementById("button1");
var button2 = document.getElementById("button2");
var button3 = document.getElementById("button3");
var button4 = document.getElementById("button4");
var button5 = document.getElementById("button5");
var button6 = document.getElementById("button6");

button1.onclick = function(e) {
	workplace.canvas.camera.x += workplace.canvas.camera.vectorFront.x*20;
	workplace.canvas.camera.y += workplace.canvas.camera.vectorFront.y*20;
	workplace.canvas.camera.z += workplace.canvas.camera.vectorFront.z*20;
};
button1.innerHTML = "Forward";

button2.onclick = function(e) {
	workplace.canvas.camera.x -= workplace.canvas.camera.vectorFront.x*5;
	workplace.canvas.camera.y -= workplace.canvas.camera.vectorFront.y*5;
	workplace.canvas.camera.z -= workplace.canvas.camera.vectorFront.z*5;
};
button2.innerHTML = "Backward";

button3.onclick = function(e) {workplace.canvas.camera.yaw += Math.PI/10};
button3.innerHTML = "+Yaw";

button4.onclick = function(e) {workplace.canvas.camera.yaw += Math.PI/10};
button4.innerHTML = "-Yaw";

button5.onclick = function(e) {workplace.canvas.camera.pitch += Math.PI/10};
button5.innerHTML = "+Pitch";

button6.onclick = function(e) {workplace.canvas.camera.pitch -= Math.PI/10};
button6.innerHTML = "-Pitch";

button7.onclick = function(e) {workplace.canvas.camera.roll += Math.PI/10};
button7.innerHTML = "+Roll";

button8.onclick = function(e) {workplace.canvas.camera.roll -= Math.PI/10};
button8.innerHTML = "-Roll";

