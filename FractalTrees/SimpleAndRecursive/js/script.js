var a;

function setup() {
  createCanvas(800, 800);

  a = PI / 8;
}

function draw() {
  background(51);
  stroke(255);

  translate(width/2, height);
  branch(250);
}

function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 4) {
    push();
    rotate(a);
    branch(len*0.67);
    pop();
    push();
    rotate(-a);
    branch(len*0.67);
    pop();
  }
}
