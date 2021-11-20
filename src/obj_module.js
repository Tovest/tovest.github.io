import { CategoryNode , EntryNode } from "./infoTree_module.js";

////|
//|		Base Obj																															-- Base Obj --
////|

class BaseObj {
	constructor() {
		this.layer = undefined;
	}
	getInfoTree() {
		return new EntryNode("undefined node");
	}
}


////|
//|		Point Obj																															-- Point Obj --
////|

export class PointObj extends BaseObj {
	constructor(x,y,z) {
		super();
		this.x = x;
		this.y = y;
		this.z = z;
	}
	getInfoTree() {
		var infoRoot = new CategoryNode("Point");
		var infoOrigin = new CategoryNode("Origin");
		infoRoot.addChild(infoOrigin);
		infoOrigin.addChild(new EntryNode("x",this.x));
		infoOrigin.addChild(new EntryNode("y",this.y));
		infoOrigin.addChild(new EntryNode("z",this.z));
		return infoRoot;
	}
}


////|
//|		Line Obj																															-- Line Obj --
////|

export class LineObj extends BaseObj {
	constructor(v1,v2) {
		super();
		this.v1 = v1;
		this.v2 = v2;
		this.length = Math.sqrt(
			(v1.x-v2.x) * (v1.x-v2.x) +
			(v1.y-v2.y) * (v1.y-v2.y) +
			(v1.z-v2.z) * (v1.z-v2.z)
			)
	}
	getInfoTree() {
		var infoRoot = new CategoryNode("Line");
		var infoV1 = new CategoryNode("V1");
		var infoV2 = new CategoryNode("V2");
		var infoProperty = new CategoryNode("Property");
		infoRoot.addChild(infoV1);
		infoRoot.addChild(infoV2);
		infoRoot.addChild(infoProperty);
		infoV1.addChild(this.v1.getInfoTree());
		infoV2.addChild(this.v2.getInfoTree());
		infoProperty.addChild(new EntryNode("Length",this.length));
		return infoRoot;
	}
}


////|
//|		Polygon Obj																															--[Polygon Obj]--
////|

export class PolygonObj extends BaseObj {
	constructor(v1,v2,v3) {
		super();
		this.v1 = v1;
		this.v2 = v2;
		this.v3 = v3;
	}
	getInfoTree() {
		var infoRoot = new CategoryNode("Polygon");
		var infoV1 = new CategoryNode("V1");
		var infoV2 = new CategoryNode("V2");
		var infoV3 = new CategoryNode("V3");
		infoRoot.addChild(infoV1);
		infoRoot.addChild(infoV2);
		infoRoot.addChild(infoV3);
		infoV1.addChild(this.v1.getInfoTree());
		infoV2.addChild(this.v2.getInfoTree());
		infoV3.addChild(this.v2.getInfoTree());
		return infoRoot;
	}
}
