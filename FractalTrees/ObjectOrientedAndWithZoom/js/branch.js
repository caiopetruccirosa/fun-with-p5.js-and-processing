function Branch(start, end, weight) {
    this.start = start;
    this.end = end;
    this.weight = weight;
    this.grown = false;

    this.growBranches = function() {
      var dirL = p5.Vector.sub(this.end, this.start);
      var dirR = p5.Vector.sub(this.end, this.start);
      dirL.rotate(random(-PI/6, -PI/8));
      dirL.mult(random(0.7, 0.8));
      dirR.rotate(random(PI/6, PI/8));
      dirR.mult(random(0.7, 0.8));

      this.grown = true;

      return [new Branch(this.end, p5.Vector.add(this.end, dirL), ceil(this.weight*0.55)), 
              new Branch(this.end, p5.Vector.add(this.end, dirR), ceil(this.weight*0.55))];
    }

    this.zoom = function(middle, vel) {
      var variationS = p5.Vector.sub(this.start, middle);
      var variationE = p5.Vector.sub(this.end, middle);
      variationS.mult(vel);
      variationE.mult(vel);

      this.start = p5.Vector.add(this.start, variationS);
      this.end = p5.Vector.add(this.end, variationE);
    }

    this.isAppearing = function(max) {
      if (((this.start.x < 0 || this.start.x > max.x) ||
           (this.start.y < 0 || this.start.y > max.y)) &&
           ((this.end.x < 0 || this.end.x > max.x) ||
           (this.end.y < 0 || this.end.y > max.y)))
        return false;

      return true;
    }

    this.show = function() {
      strokeWeight(this.weight);
      stroke(255);

      var relative_variation = round(this.weight/2);
      line(this.start.x, 
           this.start.y, 
           this.end.x, 
           this.end.y);
    }
}