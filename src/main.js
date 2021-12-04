import { PointObj , LineObj , PolygonObj } from "./obj_module.js";
import { Canvas } from "./canvas_module.js"
import { Workplace } from "./workplace_module.js"
import { CameraOrtho } from "./camera_module.js"
import { SnapPoint } from "./entity_module.js"

console.log("v12");

var what = 5;
var point = new SnapPoint(0,0,0);
var canvas = new Canvas();
var workplace = new Workplace(new CameraOrtho(0,0,0,0,0,0), canvas);
workplace.entityList.push(point);
console.log(workplace);
workplace.render();
canvas.triggerHover(5,6);
canvas.triggerHover(5,3);
canvas.triggerHover(5,0.1);
canvas.triggerHover(5,0);
canvas.triggerHover(5,-0.1);
canvas.triggerHover(5,-0.3);
canvas.triggerHover(5,-6);
