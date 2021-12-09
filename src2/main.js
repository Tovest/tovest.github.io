var canvas = new Canvas2d("canvas", new CameraOrtho(0,0,0,0,0,0));
var snapPoint1 = SnapPointEntity.create(-50,20,30);
var snapPoint2 = SnapPointEntity.create(-40,20,25);
var snapPoint3 = SnapPointEntity.create(-30,20,20);
var snapPoint4 = SnapPointEntity.create(-20,20,15);
var snapPoint5 = SnapPointEntity.create(-10,20,10);
var snapPoint6 = SnapPointEntity.create(0,20,5);
var snapPoint7 = SnapPointEntity.create(10,20,0);
var snapPoint8 = SnapPointEntity.create(20,20,-0);
var snapPoint9 = SnapPointEntity.create(30,20,-10);
var snapPoint10 = SnapPointEntity.create(40,20,-15);
var snapPoint11 = SnapPointEntity.create(50,20,-20);
//var line = new LineEntity(snapPoint1.vertex,snapPoint2.vertex);
var workplace = new Workplace([snapPoint1,snapPoint2,snapPoint3,snapPoint4,snapPoint5,snapPoint6,snapPoint7,snapPoint8,snapPoint9,snapPoint10,snapPoint11],canvas);

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
	workplace.render();
};
button1.innerHTML = "Forward";

button2.onclick = function(e) {
	workplace.canvas.camera.x -= workplace.canvas.camera.vectorFront.x*5;
	workplace.canvas.camera.y -= workplace.canvas.camera.vectorFront.y*5;
	workplace.canvas.camera.z -= workplace.canvas.camera.vectorFront.z*5;
	workplace.render();
};
button2.innerHTML = "Backward";

button3.onclick = function(e) {workplace.canvas.camera.yaw += Math.PI/10; workplace.canvas.camera.updateVectors(); workplace.render();};
button3.innerHTML = "+Yaw";

button4.onclick = function(e) {workplace.canvas.camera.yaw -= Math.PI/10; workplace.canvas.camera.updateVectors(); workplace.render();};
button4.innerHTML = "-Yaw";

button5.onclick = function(e) {workplace.canvas.camera.pitch += Math.PI/10; workplace.canvas.camera.updateVectors(); workplace.render();};
button5.innerHTML = "+Pitch";

button6.onclick = function(e) {workplace.canvas.camera.pitch -= Math.PI/10; workplace.canvas.camera.updateVectors(); workplace.render();};
button6.innerHTML = "-Pitch";

button7.onclick = function(e) {workplace.canvas.camera.roll += Math.PI/10; workplace.canvas.camera.updateVectors(); workplace.render();};
button7.innerHTML = "+Roll";

button8.onclick = function(e) {workplace.canvas.camera.roll -= Math.PI/10; workplace.canvas.camera.updateVectors(); workplace.render();};
button8.innerHTML = "-Roll";

