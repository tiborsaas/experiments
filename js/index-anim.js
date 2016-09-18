
const canvasEl = document.querySelector('canvas');
const canvas = canvasEl.getContext('2d');

const w = window.innerWidth, h = window.innerHeight;

canvas.canvas.width = w;
canvas.canvas.height = h;

function rgb(r, g, b) {
  return `rgb(${r}, ${g}, ${b})`;
}

function rgba(r, g, b, a) {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function getRad( degree ) {
    return Math.PI/180 * degree;
}

canvas.triangle = function (x, y, s) {
  var height = s / 2 * Math.sqrt(3);
  this.beginPath();
  this.moveTo(x, y);
  this.lineTo(x+s, y);
  this.lineTo(x+s/2, y - height);
  this.closePath();
  this.stroke();
}

/**
 * canvas.save(); canvas.restore();
 * canvas.rotate();
 */
canvas.lineWidth = 2;
canvas.strokeStyle = 'white';

let r = 0, x = 0, angle = 13, innerScale = 18;

function draw() {
    var i = 360/2;
    canvas.fillRect( 0, 0, w, h );
    canvas.save();
    canvas.translate( w/2, h/2 );
    while ( i >= 0 ) {
        canvas.rotate( getRad(i + r) );
        canvas.strokeStyle = rgba( 255, 255,255,0.21 );
        canvas.triangle( -w/2, -h/8, w/3);
        canvas.triangle( -w/innerScale, h/innerScale, w/innerScale);
        i = i - angle;
    }
    canvas.restore();
    r += Math.abs( Math.sin(x) / 15 );
    x += 0.001;
    requestAnimationFrame( draw );
}
draw();
