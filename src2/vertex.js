class Vertex {
	constructor(x,y,z) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.observers = [];
	}
	notifyObservers() {
		for (var i=0; i<this.observers.length; i++) {
			this.observers[i].updateSelf();
		}
	};
	updateSelf() {};
}

class VertexEdge extends Vertex {
	constructor(x,y,z) {
		super(x,y,z)
	}
	setX(x) {
		this.x = x;
		this.notifyObservers();
	};
	setY(y) {
		this.y = y;
		this.notifyObservers();
	};
	setZ(z) {
		this.z = z;
		this.notifyObservers();
	};
	setCoords(x,y,z) {
		this.setX(x);
		this.setY(y);
		this.setZ(z);
		this.notifyObservers();
	}
}

class VertexLinePoint extends Vertex {
	constructor(v1,v2,proportion) {
		super( (v1.x+v2.x)*proportion , (v1.y+v2.y)*proportion , (v1.z+v2.z)*proportion );
		this.proportion = proportion;
		this.v1 = v1;
		this.v2 = v2;
		v1.observers.push(this);
		v2.observers.push(this);
	}
	updateSelf() {
		this.x = (this.v1.x+this.v2.x)*this.proportion;
		this.y = (this.v1.y+this.v2.y)*this.proportion;
		this.z = (this.v1.z+this.v2.z)*this.proportion;
		this.notifyObservers();
	}
}
