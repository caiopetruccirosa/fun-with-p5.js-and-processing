var trees = [];
var leaves = [];

var count = 0;

function setup() {
  createCanvas(1000, 1000);
  frameRate(10);

  createTrees();
}

function draw() {
  background(51, 51, 51);

  for (var i = 0; i < trees.length; i++)
    for (var j = 0; j < trees[i].length; j++)
      trees[i][j].show();

  if (count < 9) {
    grow();
    count++;
  }
}

function mousePressed() {
  for (var i = 0; i < leaves.length; i++) {
    noStroke();
    fill(0, 255, 0);
    ellipse(leaves[i].x, leaves[i].y, 6, 6);
  }
}

function grow() {
  for (var i = 0; i < trees.length; i++) {
    for (var j = trees[i].length-1; j >= 0; j--) {
      if (!trees[i][j].grown) {
        var branches = trees[i][j].growBranches();
        trees[i].push(branches[0]);
        trees[i].push(branches[1]);
        leaves.push(trees[i][j].end);
      }
    }
  }
}

function createTrees() {
  var rootLen = 70;
  var rootWeight = 8;

  var start;
  var end;

  start = createVector(width/2, 0);
  end = createVector(width/2, rootLen);
  trees.push([new Branch(start, end, rootWeight)]);

  start = createVector(width, height/2);
  end = createVector(width-rootLen, height/2);
  trees.push([new Branch(start, end, rootWeight)]);

  start = createVector(width/2, height);
  end = createVector(width/2, height-rootLen);
  trees.push([new Branch(start, end, rootWeight)]);

  start = createVector(0, height/2);
  end = createVector(rootLen, height/2);
  trees.push([new Branch(start, end, rootWeight)]);

  rootLen *= 1.5;

  start = createVector(0, 0);
  end = p5.Vector.add(start, p5.Vector.sub(createVector(rootLen, 0), start).rotate(PI/4));
  trees.push([new Branch(start, end, rootWeight)]);

  start = createVector(width, 0);
  end = p5.Vector.add(start, p5.Vector.sub(createVector(width-rootLen, 0), start).rotate(-PI/4));
  trees.push([new Branch(start, end, rootWeight)]);

  start = createVector(width, height);
  end = p5.Vector.add(start, p5.Vector.sub(createVector(width-rootLen, height), start).rotate(PI/4));
  trees.push([new Branch(start, end, rootWeight)]);

  start = createVector(0, height);
  end = p5.Vector.add(start, p5.Vector.sub(createVector(rootLen, height), start).rotate(-PI/4));
  trees.push([new Branch(start, end, rootWeight)]);
}