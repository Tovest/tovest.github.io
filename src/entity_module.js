import { PointObj } from "./obj_module.js"
import { PointArea } from "./area_module.js"
import { SelectableArea } from "./selectableArea_module.js"
import { Vector3d } from "./vector.js"

export class entity {
	constructor() {}
	translateToCanvas(camera,canvas) {
		//ToDo, this should setup canvas with elements2d and selectable areas.
		return;
	}
}
export class snapPoint {
	constructor(x,y,z) {
		this.point = new PointObj(x,y,z);
	}
	translateToCanvas(camera,canvas) {
		var coords = camera.objToCoords(this.point);
		var selectableArea = new SelectableArea(new PointArea(coords.x,coords.y,5));
		selectableArea.onHover = new eventAddSprite(/*spriteHover*/);
		selectableArea.onClick = new eventProressRequest();
		canvas.addElement2d(new Sprite(coords.x,coords.y,coords.depth,/*spriteSnapPoint*/));
		canvas.addSelectableArea(selectableArea);
	}
}
