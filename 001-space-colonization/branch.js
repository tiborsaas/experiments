
function Branch( parent, pos, dir) {
	this.pos = pos;
	this.parent = parent;
	this.dir = dir;
	this.originalDir = this.dir.copy();
	this.count = 0;
	this.len = 5;

	this.reset = function (argument) {
		this.dir = this.originalDir.copy();
		this.count = 0;
	}

	this.next = function () {
		let nextDir = p5.Vector.mult( this.dir, this.len );
		let nextPos = p5.Vector.add( this.pos, nextDir );
		let nextBranch = new Branch( this, nextPos, this.dir.copy() ); 
		return nextBranch; 
	}

	this.show = function () {
		if( parent != null ) {
 			line( this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y );
		}
	}
}
