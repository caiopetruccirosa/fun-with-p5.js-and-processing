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

    this.show = function() {
      strokeWeight(this.weight);
      stroke(255);

      line(this.start.x+random(0, 5), 
           this.start.y+random(0, 5), 
           this.end.x+random(0, 5), 
           this.end.y+random(0, 5));
    }
}