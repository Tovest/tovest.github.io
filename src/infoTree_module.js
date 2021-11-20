////|
//|		InfoNode superclass																															-- InfoNode superclass --
////|

class InfoNode {
	constructor() {}
	toString() {
		return "undefined text";
	}
}


////|
//|		CategoryNode																																-- CategoryNode --
////|

export class CategoryNode extends InfoNode {
	constructor(title) {
		this.title = title;
		this.children = [];
	}
	addChild(node) {
		this.children.push(node);
	}
	toString() {
		if (this.children.length == 0) return title;
		var childrenText = "";
		if (this.children.length == 1) childrenText = this.children[0].getText();
		else {
			for (let i=0; i<this.children.length-1; i++) childrenText += (this.children[i].getText()+",");
			childrenText += this.children[this.children.length-1].getText();
		}
		return (this.title+"["+childrenText+"]")
	}
}


////|
//|		EntryNode																																-- EntryNode --
////|

export class EntryNode extends InfoNode {
	constructor(content) {
		this.content = content;
	}
	toString() {
		return this.content;
	}
}
