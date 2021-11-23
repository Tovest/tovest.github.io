import { PointArea , LineArea , TriangleArea } from "./area_module.js"

export class SelectableArea {
	constructor(area) {
		this.area = area;
		this.onHover = undefined;
		this.onClick = undefined;
	}
}
