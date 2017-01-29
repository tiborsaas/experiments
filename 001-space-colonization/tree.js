
function Tree( startX, startY, pointData ) {
	this.leaves = [];
	this.branches = [];

	for (var i = 0; i < pointData.length; i++) {
		this.leaves.push( new Leaf( pointData[i] ) );
	}

	let pos = createVector( startX, startY );
	let direction = createVector( 0, -1 );
	let root = new Branch( null, pos, direction );

	this.branches.push( root );

	let current = root;
	let found = false;
	let maxWidth = 7;

	while ( !found ) {
		for (var i = 0; i < this.leaves.length; i++) {
			// console.log(current, this.leaves[i])
			var d = p5.Vector.dist( current.pos, this.leaves[i].pos );
			if( d < max_dist ) {
				found = true;
			}
		}

		if( !found ) {
			let branch = current.next();
			current = branch;
			this.branches.push(current);
			console.log('not')
		}
	}

	this.grow = function () {
		for (var i = 0; i < this.leaves.length; i++) {
			let leaf = this.leaves[i];
			let closestBranch = null;
			let record = 1000;

			for (var j = 0; j < this.branches.length; j++) {
				let branch = this.branches[j];
				let d = p5.Vector.dist( leaf.pos, branch.pos );

				if( d < min_dist ) {
					leaf.reached = true;
					closestBranch = null;
					break;
				} else if ( closestBranch == null || d < record ) {
					closestBranch = branch;
					record = d;
				}
			}

			if( closestBranch != null ) {
				let newDirection = p5.Vector.sub( leaf.pos, closestBranch.pos );
				newDirection.normalize();

				closestBranch.dir.add( newDirection );
				closestBranch.count++;
			}
		}

		for (var i = this.leaves.length - 1; i >= 0; i--) {
			if( this.leaves[i].reached ) {
				this.leaves.splice(i,1);
			}
		}

		for (var i = this.branches.length-1; i >= 0 ; i-- ) {
			let branch = this.branches[i];
			if( branch.count > 0 ) {
				branch.dir.div( branch.count + 1 );
				let randVedt = p5.Vector.random2D();
				randVedt.setMag(0.3);
				branch.dir.add(randVedt);
				this.branches.push( branch.next() );
			}
			branch.reset();
		}
	}

 	this.show = function () {
		for (var i = 0; i < this.leaves.length; i++) {
			this.leaves[i].show();
		}
		for (var i = 0; i < this.branches.length; i++) {
			strokeWeight( maxWidth - i / this.branches.length * maxWidth );
			this.branches[i].show();
		}
	}
}
