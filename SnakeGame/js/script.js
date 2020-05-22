var scl = 15;
var cols = 0;
var rows = 0;
var foiComida = true;
var	snake;

function setup() {
	createCanvas(400, 400);
	frameRate(10);

	cols = floor(width/scl);
	rows = floor(height/scl);

	snake = new Snake(scl, cols, rows);

	colocarComida();
}

function draw() {
	background(51);
	colocarComida();
	mover();
	snake.update();
	snake.show();
}

function mover() {
	if (keyCode === UP_ARROW && snake.velY != 1) {
		snake.dir(0, -1);
	} else if (keyCode === DOWN_ARROW && snake.velY != -1) {
		snake.dir(0, 1);
	} else if (keyCode === LEFT_ARROW && snake.velX != 1) {
		snake.dir(-1, 0);
	} else if (keyCode === RIGHT_ARROW && snake.velX != -1) {
		snake.dir(1, 0);
	}
}

function colocarComida() {
	if (foiComida) {
		var comidaX = random(0, cols);
		var comidaY = random(0, rows);
		foiComida = false;
	}
	var comida = createVector(comidaX, comidaY);
	fill(255, 0, 0);
	rect(comidaX*scl, comidaY*scl, scl, scl);
}