var cols, rows;
var s = 40;

var grid = [];
var stack = [];

var ended = false;

var current;

function setup() {
	createCanvas(800, 800);
	frameRate(10);
	cols = floor(width/s);
	rows = floor(height/s);

	for (var y = 0; y < rows; y++) {
		for (var x = 0; x < cols; x++) {
			var cell = new Cell(x, y);
			grid.push(cell);
		}
	}

	current = grid[0];
	current.visited = true;
}

function draw() {
	background(51);
	for (var i = 0; i < grid.length; i++) {
		grid[i].show();
	}

	if (!ended)
		current.highlight();
	else
		noLoop();

	next = current.pickNeighbour();
	if (next) {
		next.visited = true;
		stack.push(current);
		removeWalls(current, next);

		current = next;
	} else if (stack.length > 0) {
		current = stack.pop();
	} else {
		ended = true;
	}
}

function index(x, y) {
	if (x < 0 || y < 0 || x >= cols || y >= rows)
		return -1;

	return x + y * cols;
}

function removeWalls(a, b) {
	var x = a.x - b.x;
	var y = a.y - b.y;

	if (x===1) {
		a.walls[3] = false;
		b.walls[1] = false;
	}

	if (x===-1) {
		a.walls[1] = false;
		b.walls[3] = false;
	}

	if (y===1) {
		a.walls[0] = false;
		b.walls[2] = false;
	}

	if (y===-1) {
		a.walls[2] = false;
		b.walls[0] = false;
	}
}
