import { PointObj , LineObj , PolygonObj } from "./obj_module.js";
import { Canvas } from "./canvas_module.js"
import { Workplace } from "./workplace_module.js"
import { CameraOrtho } from "./camera_module.js"
import { SnapPoint } from "./entity_module.js"

console.log("v15");

var what = 5;
var point = new SnapPoint(0,20,0);
var point2 = new SnapPoint(0,20,15);
var canvas = new Canvas(document.getElementById("canvas"));
var workplace = new Workplace(new CameraOrtho(0,0,0,0,0,0), canvas);
workplace.entityList.push(point);
workplace.entityList.push(point2);
console.log(workplace);
workplace.render();
console.log(0,0);
canvas.triggerHover(0,0);
console.log(0,-6)
canvas.triggerHover(0,-6);
console.log(0,-2)
canvas.triggerHover(0,-2);
console.log(0,2)
canvas.triggerHover(0,2);
console.log(0,7)
canvas.triggerHover(0,7);
console.log(0,10)
canvas.triggerHover(0,10);
console.log(0,14)
canvas.triggerHover(0,14);
console.log(0,18)
canvas.triggerHover(0,18);
console.log(0,21)
canvas.triggerHover(0,21);
