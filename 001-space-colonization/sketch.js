
let tree;
let tree2;
let min_dist = 10;
let max_dist = 100;
let x = null;

function preload() {
  img = loadImage("corr.jpg");
}

function setup() {
	createCanvas(600,600);

	image(img, 0, 0);
	
	loadPixels();

	let average = 0;
	let index = 0;
	let cell = 10;
	let chunk = null;
	let chunkSum = 0;
	let target = cell * cell * 255 * 4 / 2;
	let pointData = [];
	let rndIndex = 0;

	/**
	 * Find auto treshold value. Averaging pixel values is good enough for this purpose
	 */
	for (var i = 0; i < pixels.length; i+=4) {
		average += pixels[i];
		average += pixels[i+1];
		average += pixels[i+2];
	}

	average = average / ( pixels.length / 4 );

	// Perfomring treshold
	for (var i = 0; i < pixels.length; i+=4) {
		var col = ( pixels[i] + pixels[i+1] + pixels[i+2] > average ) ? 199:0

		pixels[i+0] = col
		pixels[i+1] = col
		pixels[i+2] = col
		pixels[i+3] = 255;
	}

	updatePixels();

	// noStroke()

	loadPixels();

	// Initialize the tree
	for ( var x = 0; x < img.width; x += cell ) {
		for ( var y = 0; y < img.height; y += cell ) {
			chunkSum = 0;

			for (var s = 0; s < cell; s++) {
				index = x + ( (y+s) * img.width );

				for (var i = 0; i < cell; i++) {
					chunkSum += pixels[index*4] + pixels[index*4+1] + pixels[index*4+2];
				}
			}

			if( chunkSum > target * 0.4 && chunkSum < target * 1.1 ) {
				pointData.push( [x,y] );
				// fill(0,255,0,80)
			} else {
				// fill(255,0,0,80)
			}

			rect( x, y, cell, cell );
		}
	}

	rndIndex = Math.floor( random(pointData.length) );
	tree = new Tree( pointData[ rndIndex ][0], pointData[ rndIndex ][0], pointData );
}

function draw() {
	// background(233,51,0);
	image(img, 0, 0);
	tree.grow();
	tree.show();
}
