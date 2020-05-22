var cols, rows;
var w = 600;
var h = 600;
var s = 40;
var m = 20;

var grid = [];
var stack = [];

var ended = false;

var current;

function setup() {
	createCanvas(w+m*2, h+m*2);
	frameRate(15);
	cols = floor(w/s);
	rows = floor(h/s);

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
	background(110, 42, 108);
	translate(m, m);

	noStroke();
	fill(51);
	rect(0, 0, w, h);

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
	var x = b.x - a.x;
	var y = b.y - a.y;

	if (x===1 || x < -1) {
		a.walls[1] = false;
		b.walls[3] = false;
	} else if (x===-1 || x > 1) {
		a.walls[3] = false;
		b.walls[1] = false;
	}

	if (y===1 || y < -1) {
		a.walls[2] = false;
		b.walls[0] = false;
	} else if (y===-1 || y > 1) {
		a.walls[0] = false;
		b.walls[2] = false;
	}
}
