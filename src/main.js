import { PointObj , LineObj , PolygonObj } from "./obj_module.js";

console.log("v9");

console.log(new LineObj(new PointObj(1,2,3), new PointObj(4,5,6)).getInfoTree().toText())
