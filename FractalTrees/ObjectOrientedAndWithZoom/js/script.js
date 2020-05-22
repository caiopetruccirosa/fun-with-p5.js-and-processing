var trees = [];

var r, g, b;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(10);

  createTrees();
}

function draw() {
  r = map(sin(frameCount*15), -1, 1.5, 0, 255);
  g = map(cos(frameCount/10), -1, 1.5, 0, 255);
  b = map(sin(frameCount/7), -1, 1.5, 0, 255);

  background(51, 51, 51);

  var middle = createVector(width/2, height/2);
  for (var i = 0; i < trees.length; i++) {
    for (var j = 0; j < trees[i].length; j++) {
      trees[i][j].zoom(middle, 0.01);
      trees[i][j].show();

      if (!trees[i][j].isAppearing(createVector(windowWidth, windowHeight)))
        trees[i].splice(j, 1);
    }
  }
  
  if (frameCount % 9 == 0)
    grow();
}

//function mousePressed() {
//  for (var i = 0; i < leaves.length; i++) {
//    fill(0, 255, 0);
//    ellipse(leaves[i].x, leaves[i].y, 15, 15);
//  }
//}

function grow() {
  for (var i = 0; i < trees.length; i++) {
    for (var j = trees[i].length-1; j >= 0; j--) {
      if (!trees[i][j].grown) {
        var branches = trees[i][j].growBranches();
        trees[i].push(branches[0]);
        trees[i].push(branches[1]);
      }
    }
  }
}

function createTrees() {
  var rootLen = 170;
  var rootWeight = 4;

  var start;
  var end;

  //start = createVector(width/2, 0);
  //end = createVector(width/2, rootLen);
  //trees.push([new Branch(start, end, rootWeight)]);

  //start = createVector(width, height/2);
  //end = createVector(width-rootLen, height/2);
  //trees.push([new Branch(start, end, rootWeight)]);

  start = createVector(width/2, height);
  end = createVector(width/2, height-rootLen);
  trees.push([new Branch(start, end, rootWeight)]);

  //start = createVector(0, height/2);
  //end = createVector(rootLen, height/2);
  //trees.push([new Branch(start, end, rootWeight)]);
  //rootLen *= 1.5;
//
  //start = createVector(0, 0);
  //end = p5.Vector.add(start, p5.Vector.sub(createVector(rootLen, 0), start).rotate(PI/4));
  //trees.push([new Branch(start, end, rootWeight)]);
//
  //start = createVector(width, 0);
  //end = p5.Vector.add(start, p5.Vector.sub(createVector(width-rootLen, 0), start).rotate(-PI/4));
  //trees.push([new Branch(start, end, rootWeight)]);
//
  //start = createVector(width, height);
  //end = p5.Vector.add(start, p5.Vector.sub(createVector(width-rootLen, height), start).rotate(PI/4));
  //trees.push([new Branch(start, end, rootWeight)]);
//
  //start = createVector(0, height);
  //end = p5.Vector.add(start, p5.Vector.sub(createVector(rootLen, height), start).rotate(-PI/4));
  //trees.push([new Branch(start, end, rootWeight)]);

  grow();
  grow();
}