const layers = 9;
const w = 100;

let angle;
let maxDist;
let middleDist;
let visualDist;

function setup() {
	createCanvas(2*layers*w, 2*layers*w, WEBGL);
	ortho(0, 0, 0, 0, 0, height*2);

	frameRate(60);

	angle = 0;

	middleDist = Math.ceil((layers-1)/2)*w;
	visualDist = dist(0, 0, layers*w, layers*w)/2;
	maxDist = dist(0, 0, middleDist, middleDist);
}

function draw() {
	background(143, 186, 200);

	translate(-visualDist, 0, 0);

	rotateX(PI/5);
	rotateY(PI/4);

	directionalLight(255, 255, 255, width/2, -height, width/2);

	for (var i = 0; i < layers; i++) {
		for (var j = 0; j < layers; j++) {
			let actualDist = dist(i*w, j*w, middleDist, middleDist);
			let offset = map(actualDist, 0, maxDist, -2.5, 2.5);

			let h = map(sin(angle+offset), -1, 1, 100, 350);

			translate(w, 0, 0);
			normalMaterial(255, 0, 0);
			box(w-2, h, w-2);
		}
		translate(-(layers*w), 0, w);
	}
	angle -= 0.1;
}