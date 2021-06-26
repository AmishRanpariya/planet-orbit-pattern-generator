class Planet {
	constructor(orbtrad, period, img) {
		this.orbitRadius = orbtrad;
		this.period = period;
		this.img = img;
	}
}

let planets = [];
let p1, p2, p1r, p2r;

let offset = 0;
let ratio;
let mercuryimg,
	venusimg,
	earthimg,
	marsimg,
	jupiterimg,
	saturnimg,
	uranusimg,
	neptuneimg,
	plutoimg,
	sunimg,
	spaceimg;
let trail;
let minsize;

function preload() {
	mercuryimg = loadImage("images/mercury.png");
	venusimg = loadImage("images/venus.png");
	earthimg = loadImage("images/earth.png");
	marsimg = loadImage("images/mars.png");
	jupiterimg = loadImage("images/jupiter.png");
	saturnimg = loadImage("images/saturn.png");
	uranusimg = loadImage("images/uranus.png");
	neptuneimg = loadImage("images/neptune.png");
	plutoimg = loadImage("images/pluto.png");
	sunimg = loadImage("images/sun.png");
	spaceimg = loadImage("images/space.jpg");
}

function setup() {
	let canvassize = windowWidth > windowHeight ? windowHeight : windowWidth;
	createCanvas(canvassize, canvassize);
	trail = createGraphics(width, height);
	minsize = min(width, height);
	trail.angleMode(DEGREES);
	angleMode(DEGREES);
	trail.stroke(255, 100);
	imageMode(CENTER);

	//  mercury
	planets[0] = new Planet(57.9, 88, mercuryimg);

	//venus
	planets[1] = new Planet(108.2, 224.7, venusimg);

	//earth
	planets[2] = new Planet(149.6, 365, earthimg);

	//  mars
	planets[3] = new Planet(227.9, 687, marsimg);

	//  jupiter
	planets[4] = new Planet(778.6, 4331, jupiterimg);

	//  saturn
	planets[5] = new Planet(1433.5, 10747, saturnimg);

	//  uranus
	planets[6] = new Planet(2872.5, 30589, uranusimg);

	//  neptune
	planets[7] = new Planet(4495.1, 59800, neptuneimg);

	// pluto
	planets[8] = new Planet(5906.4, 90560, plutoimg);

	setPlanets();
}

function setPlanets() {
	//clearing previous planet trackings
	clear();
	trail.clear();

	let p1selected = document.getElementById("inputP1").options.selectedIndex;
	let p2selected = document.getElementById("inputP2").options.selectedIndex;

	p1 = planets[p1selected];
	p2 = planets[p2selected];

	//setting the small orbitRadius planet as p2
	if (p1.orbitRadius < p2.orbitRadius) {
		let temp = p2;
		p2 = p1;
		p1 = temp;
	}
	ratio = p1.period / p2.period;

	//settings the radius According the canvas size
	p1r = map(p1.orbitRadius, 0, p1.orbitRadius, 0, minsize * 0.42);
	p2r = map(p2.orbitRadius, 0, p1.orbitRadius, 0, minsize * 0.42);
}

function draw() {
	push();
	trail.push();
	translate(width / 2, height / 2);
	trail.translate(width / 2, height / 2);

	trail.noFill();
	trail.ellipse(0, 0, p1r * 2); //p1 orbit
	trail.ellipse(0, 0, p2r * 2); //p2 orbit

	let xe = p1r * sin(offset);
	let ye = p1r * cos(offset);
	let xv = p2r * sin(offset * ratio);
	let yv = p2r * cos(offset * ratio);
	trail.stroke(255, 100);
	trail.line(xe, ye, xv, yv);
	image(spaceimg, 0, 0, minsize, minsize);
	image(trail, 0, 0);
	image(sunimg, 0, 0, 40, 40);
	image(p1.img, xe, ye, 20, 20);
	image(p2.img, xv, yv, 25, 25);

	offset += 1;
	trail.pop();
	pop();
}
