class Vertex {
	constructor(x,y,z) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.observers = [];
	}
	notifyObservers() {
		for (observer in this.observers) {
			observer.updateSelf();
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

class VertexMidpoint extends Vertex {
	constructor(v1,v2) {
		super( (v1.x+v2.x)/2 , (v1.y+v2.y)/2 , (v1.z+v2.z)/2 );
		v1.observers.push(this);
		v2.observers.push(this);
	}
	updateSelf() {
		this.x = (v1.x+v2.x)/2;
		this.y = (v1.y+v2.y)/2;
		this.z = (v1.z+v2.z)/2;
		this.notifyObservers();
	}
}

