import { PointObj } from "./obj_module.js"
import { PointArea } from "./area_module.js"
import { SelectableArea } from "./selectableArea_module.js"
import { Vector3d } from "./vector.js"

export class Entity {
	constructor() {}
	translateToCanvas(camera,canvas) {
		//ToDo, this should setup canvas with elements2d and selectable areas.
		return;
	}
}
export class SnapPoint extends Entity {
	constructor(x,y,z) {
		super();
		this.point = new PointObj(x,y,z);
	}
	translateToCanvas(camera,canvas) {
		var coords = camera.getScreenCoordsOfPoint(this.point.x,this.point.y,this.point.z);
		var selectableArea = new SelectableArea(new PointArea(coords.x,coords.y,5));
		selectableArea.onHover = new eventConsoleLog("Hovering Snap Point");
		selectableArea.onClick = new eventConsoleLog("Clicked Snap Point");
		canvas.addSelectableArea(selectableArea);
	}
}
