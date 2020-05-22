function Snake(scl, cols, rows) {
	this.x = 0;
	this.y = 0;
	this.velX = 1;
	this.velY = 0;

	this.dir = function(x, y) {
		this.velX = x;
		this.velY = y;
	}

	this.morte = function() {
		if (this.x < 0 || this.x > cols || this.y < 0 || this.y > rows) {
			this.x = 0;
			this.y = 0;
			this.velX = 0;
			this.velY = 0;
		}
	}

	this.update = function() {
		this.morte();
		this.x = this.x + this.velX;
		this.y = this.y + this.velY;
	} 

	this.show = function(){
		fill(255);
		rect(this.x*scl, this.y*scl, scl, scl);
	}
}