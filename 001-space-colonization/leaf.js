
function Leaf( posArr ) {
	this.pos = createVector( posArr[0], posArr[1] );
	this.reached = false;

	this.show = function () {
		// ellipse( this.pos.x, this.pos.y, 10, 10 );
	}
}
