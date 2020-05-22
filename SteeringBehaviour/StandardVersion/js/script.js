var palavra = 'pontos';
var font;
var vehicles = [];

function preload() {
	font = loadFont('../font/game_over.ttf');
}

function setup() {
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);

	frameRate(60);

	textFont(font);
	textSize(750);

	var points = font.textToPoints(palavra, width/2 - palavra.length/2*150, height/2+15);

	for (var i = 0; i < points.length; i++) {
		var pt = points[i];
		var vehicle = new Vehicle(pt.x, pt.y);

		vehicles.push(vehicle);
	}
}

function draw() {
	background(51);

	for (var i = 0; i < vehicles.length; i++) {
		var vehicle = vehicles[i];
		vehicle.behaviour();
		vehicle.update();
		vehicle.show();
	}
}