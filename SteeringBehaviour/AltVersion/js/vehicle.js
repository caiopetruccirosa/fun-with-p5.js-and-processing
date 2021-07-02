function Vehicle(x, y) {
	this.pos = createVector(random(width), 0);
	this.target = createVector(x, y);
	this.vel = p5.Vector.random2D();
	this.acc = createVector();

	this.maxspeed = 10;
	this.maxforce = 1;
}

Vehicle.prototype.applyForce = function(force) {
	this.acc.add(force);
}

Vehicle.prototype.behaviour = function() {
	var arrive = this.arrive(this.target);

	var mouse = createVector(mouseX, mouseY);
	var flee = this.flee(mouse);

	arrive.mult(1);
	flee.mult(2.2);

	this.applyForce(arrive);
	this.applyForce(flee);
}

///////////////////////////////////////////////////

Vehicle.prototype.flee = function(target) {
	var desired = p5.Vector.sub(target, this.pos);
	var d = desired.mag();

	if (d < 50) {
		desired.setMag(this.maxspeed);

		var steer = p5.Vector.sub(desired, this.vel);
		steer.limit(this.maxforce);
		steer.mult(-1);

		return steer;
	} else {
		return createVector(0, 0);
	}

}

Vehicle.prototype.arrive = function(target) {
	var desired = p5.Vector.sub(target, this.pos);
	var d = desired.mag();

	var speed = this.maxspeed; 
	if (d < 100) {
		var speed = map(d, 0, 100, 0, this.maxspeed);
	}

	desired.setMag(speed);

	var steer = p5.Vector.sub(desired, this.vel);
	steer.limit(this.maxforce);

	return steer;
}

///////////////////////////////////////////////////

Vehicle.prototype.update = function() {
	this.pos.add(this.vel);
	this.vel.add(this.acc);
	this.acc.mult(0);
}

Vehicle.prototype.show = function(img) {
	image(img, this.pos.x, this.pos.y);
}