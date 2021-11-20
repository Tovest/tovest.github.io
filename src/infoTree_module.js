////|
//|		InfoNode superclass																															-- InfoNode superclass --
////|

class InfoNode {
	constructor() {}
	toText() {
		return "undefined text";
	}
}


////|
//|		CategoryNode																																-- CategoryNode --
////|

export class CategoryNode extends InfoNode {
	constructor(title) {
		super();
		this.title = title;
		this.children = [];
	}
	addChild(node) {
		this.children.push(node);
	}
	toText() {
		if (this.children.length == 0) return title;
		var childrenText = "";
		if (this.children.length == 1) childrenText = this.children[0].toText();
		else {
			for (let i=0; i<this.children.length-1; i++) childrenText += (this.children[i].toText()+",");
			childrenText += this.children[this.children.length-1].toText();
		}
		return (this.title+"["+childrenText+"]")
	}
}


////|
//|		EntryNode																																-- EntryNode --
////|

export class EntryNode extends InfoNode {
	constructor(content) {
		super();
		this.content = content;
	}
	toText() {
		return this.content;
	}
}
