var palavra = 'weed';
var font;
var vehicles = [];

var imgw;
var backimg;

var state;
var limite;

function preload() {
	font = loadFont('fonts/BorisBlackBloxx.ttf');

	imgw = loadImage('img/littleboy.png');
	backimg = loadImage('img/back.png');
}

function setup() {
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);

	frameRate(60);

	textFont(font);
	textSize(130);

	limite = 10;
	state = -limite;

	var points = font.textToPoints(palavra, width/2 - palavra.length/2*100, height/2+15);

	for (var i = 0; i < points.length; i++) {
		var pt = points[i];
		var vehicle = new Vehicle(pt.x, pt.y);

		vehicles.push(vehicle);
	}
}

function draw() {
	clear();

	for (var i = 0; i < vehicles.length; i++) {
		var vehicle = vehicles[i];

		vehicle.behaviour();
		vehicle.update();
		vehicle.show(imgw);
	}

	if (state < 0)
		cursor('img/fuckR.png');
	else
		cursor('img/fuckB.png');

	state++;
	if (state > limite)
		state = -limite;
}