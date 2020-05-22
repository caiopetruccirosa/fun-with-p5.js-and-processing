var lifespan = 1500;
var lifeP;
var generation;
var population;
var target;

var count = 0;
var generationCount = 1;

var obstacles = [];

function setup() {
	createCanvas(1000, 600);
	population = new Population();

	var obs1 = new Obstacle(0, 150, 550, 20);
	var obs2 = new Obstacle(width-550, 350, 550, 20);

	obstacles.push(obs1);
	obstacles.push(obs2);

	lifeP = createP();
	generation = createP();
	target = createVector(width/2, 20);
}

function draw() {
	background(22);

	population.run();

	lifeP.html("Lifespan:" + count);
	generation.html("Generation:" + generationCount);
	count++;

	if (count >= lifespan) {
		count = 0;
		population.evaluate();
		population.selection();

		generationCount++;
	}

	for (var i = 0; i < obstacles.length; i++) {
		obstacles[i].show();
	}

	fill(255, 0, 0);
	ellipse(target.x, target.y, 20, 20);
}

function Obstacle(x, y, w, h) {
	this.pos = createVector(x, y);
	this.width = w;
	this.height = h;

	this.hit = function(rocket) {
		if (rocket.pos.x >= this.pos.x && rocket.pos.x <= this.pos.x + this.width && rocket.pos.y >= this.pos.y && rocket.pos.y <= this.pos.y + this.height)
			return true;

		return false;
	}

	this.show = function() {
		fill(0, 255, 0);
		rect(this.pos.x, this.pos.y, this.width, this.height);
	}
}

function Rocket(dna) {
	this.pos = createVector(width/2, height);
	this.vel = createVector();
	this.acc = createVector();
	this.completed = false;
	this.stop = false;
	this.crashed = false;
	this.fitness;

	this.width = 15;
	this.height = 50;

	if (dna) {
		this.dna = dna;
	} else {
		this.dna = new DNA();
	}

	this.applyForce = function(force) {
		this.acc.add(force);
	}

	this.calcFitness = function () {
		var d = dist(this.pos.x, this.pos.y, target.x, target.y);
		this.fitness = map(d, 0, width, width, 0);

		if (this.completed) {
			this.fitness *= 100;
		}

		if (this.crashed) {
			this.fitness /= 10;
		}
	}

	this.update = function() {
		var d = dist(this.pos.x, this.pos.y, target.x, target.y);

		if (d < 10) {
			this.completed = true;
			this.pos = target.copy();
		}

		for (var i = 0; i < obstacles.length; i++)
			if (obstacles[i].hit(this))
				this.crashed = true;

		if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0) {
			this.stop =  true;
		}

		if (!this.completed && !this.crashed && !this.stop) {
			this.applyForce(this.dna.genes[count]);

			this.vel.add(this.acc);
			this.pos.add(this.vel);
			this.acc.mult(0);
		}
	}

	this.show = function() {
		push();
		noStroke();
		fill(255, 150);
		translate(this.pos.x, this.pos.y);
		rotate(-this.acc.heading()/6);;
		triangle(0, 0, -this.width/2, this.height, this.width/2, this.height);
		pop();
	}
}

function DNA(genes) {
	if (genes) {
		this.genes = genes;
	} else {
		this.genes = [];

		for (var i = 0; i < lifespan; i++) {
			this.genes[i] = p5.Vector.random2D();
			this.genes[i].setMag(0.1);
		}
	}

	this.mutation = function() {
		for (var i = 0; i < this.genes.length; i++) {
			if (random(1) < 0.05) {
				this.genes[i] = p5.Vector.random2D();
				this.genes[i].setMag(0.1);
			}
		}
	}

	this.crossover = function(partner) {
		var newgenes = [];
		var mid = floor(random(this.genes.length));

		for (var i = 0; i < this.genes.length; i++) {
			if (i > mid) {
				newgenes[i] = this.genes[i];
			} else {
				newgenes[i] = partner.genes[i];
			}
		}

		return new DNA(newgenes);
	}
}

function Population() {
	this.rockets = [];
	this.popsize = 100;
	this.matingpool = [];

	for (var i = 0; i < this.popsize; i++) {
		this.rockets[i] = new Rocket();
	}

	this.evaluate = function() {
		var maxfit = 0;

		for (var i = 0; i < this.popsize; i++) {
			this.rockets[i].calcFitness();
			
			if (this.rockets[i].fitness > maxfit) {
				maxfit = this.rockets[i].fitness;
			}
		}

		for (var i = 0; i < this.popsize; i++) {
			this.rockets[i].fitness /= maxfit;
		}

		this.matingpool = [];
		for (var i = 0; i < this.popsize; i++) {
			var n = this.rockets[i].fitness * 100;

			for (var j = 0; j < n; j++) {
				this.matingpool.push(this.rockets[i]);
			}
		}
	}

	this.selection = function() {
		var newrockets = [];
		for (var i = 0; i < this.popsize; i++) {
			this.rockets[i]
			var parent1 = random(this.matingpool).dna;
			var parent2 = random(this.matingpool).dna;
			var child = parent1.crossover(parent2);
			newrockets[i] = new Rocket(child);
		}

		this.rockets = newrockets;
	}

	this.run = function() {
		for (var i = 0; i < this.popsize; i++) {
			this.rockets[i].update();
			this.rockets[i].show();
		}
	}
}
