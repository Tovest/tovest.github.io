import { PointObj , LineObj , PolygonObj } from "./obj_module.js";
import { Canvas } from "./canvas_module.js"
import { Workplace } from "./workplace_module.js"
import { CameraOrtho } from "./camera_module.js"

console.log("v11");


var canvas = new Canvas();
var workplace = new Workplace(new CameraOrtho(0,0,0,0,0,0), canvas);
canvas.triggerHover(5,5);
console.log(new LineObj(new PointObj(1,2,3), new PointObj(4,5,6)).getInfoTree().toText())
