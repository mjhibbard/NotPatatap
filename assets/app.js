var keyData = {
	q: {
	sound: new Howl({
	  src: ['sounds/bubbles.mp3']
	}),
	color: '#1abc9c'
	},
	w: {
	sound: new Howl({
	  src: ['sounds/clay.mp3']
	}),
	color: '#2ecc71'
	},
	e: {
	sound: new Howl({
	  src: ['sounds/confetti.mp3']
	}),
	color: '#3498db'
	},
	r: {
	sound: new Howl({
	  src: ['sounds/corona.mp3']
	}),
	color: '#9b59b6'
	},
	t: {
	sound: new Howl({
	  src: ['sounds/dotted-spiral.mp3']
	}),
	color: '#34495e'
	},
	y: {
	sound: new Howl({
	  src: ['sounds/flash-1.mp3']
	}),
	color: '#16a085'
	},
	u: {
	sound: new Howl({
	  src: ['sounds/flash-2.mp3']
	}),
	color: '#27ae60'
	},
	i: {
	sound: new Howl({
	  src: ['sounds/flash-3.mp3']
	}),
	color: '#2980b9'
	},
	o: {
	sound: new Howl({
	src: ['sounds/glimmer.mp3']
	}),
	color: '#8e44ad'
	},
	p: {
	sound: new Howl({
	  src: ['sounds/moon.mp3']
	}),
	color: '#2c3e50'
	},
	a: {
	sound: new Howl({
	  src: ['sounds/pinwheel.mp3']
	}),
	color: '#f1c40f'
	},
	s: {
	sound: new Howl({
	  src: ['sounds/piston-1.mp3']
	}),
	color: '#e67e22'
	},
	d: {
	sound: new Howl({
	  src: ['sounds/piston-2.mp3']
	}),
	color: '#e74c3c'
	},
	f: {
	sound: new Howl({
	  src: ['sounds/prism-1.mp3']
	}),
	color: '#95a5a6'
	},
	g: {
	sound: new Howl({
	  src: ['sounds/prism-2.mp3']
	}),
	color: '#f39c12'
	},
	h: {
	sound: new Howl({
	  src: ['sounds/prism-3.mp3']
	}),
	color: '#d35400'
	},
	j: {
	sound: new Howl({
	  src: ['sounds/splits.mp3']
	}),
	color: '#1abc9c'
	},
	k: {
	sound: new Howl({
	  src: ['sounds/squiggle.mp3']
	}),
	color: '#2ecc71'
	},
	l: {
	sound: new Howl({
	  src: ['sounds/strike.mp3']
	}),
	color: '#3498db'
	},
	z: {
	sound: new Howl({
	  src: ['sounds/suspension.mp3']
	}),
	color: '#9b59b6'
	},
	x: {
	sound: new Howl({
	  src: ['sounds/timer.mp3']
	}),
	color: '#34495e'
	},
	c: {
	sound: new Howl({
	  src: ['sounds/ufo.mp3']
	}),
	color: '#16a085'
	},
	v: {
	sound: new Howl({
	  src: ['sounds/veil.mp3']
	}),
	color: '#27ae60'
	},
	b: {
	sound: new Howl({
	  src: ['sounds/wipe.mp3']
	}),
	color: '#2980b9'
	},
	n: {
	sound: new Howl({
	src: ['sounds/zig-zag.mp3']
	}),
	color: '#8e44ad'
	},
	m: {
	sound: new Howl({
	  src: ['sounds/moon.mp3']
	}),
	color: '#2c3e50'
	}
}
//var sound = new Howl({
//  src: ['assets/lib/howlerjs/tests/audio/sound1.mp3']
//});
var circles = [];

function onKeyDown(event) {
	sound.play();
	var maxPoint = new Point(view.size.width, view.size.height);
	var randomPoint = Point.random();
	var point = maxPoint * randomPoint;
	var newCircle = new Path.Circle(point, 500);
	newCircle.fillColor = "orange";
	circles.push(newCircle);
}

function onFrame (event){
	for(var i = 0; i < circles.length; i++){
		circles[i].fillColor.hue += 1;
		circles[i].scale(.9);
	}
}

//================ Paper.js moving multiple items

// The amount of circles we want to make:
var count = 150;

// Create a symbol, which we will use to place instances of later:
var path = new Path.Circle({
	center: [0, 0],
	radius: 10,
	fillColor: 'white',
	strokeColor: 'black'
});

var symbol = new Symbol(path);

// Place the instances of the symbol:
for (var i = 0; i < count; i++) {
	// The center position is a random point in the view:
	var center = Point.random() * view.size;
	var placedSymbol = symbol.place(center);
	placedSymbol.scale(i / count);
}

// The onFrame function is called up to 60 times a second:
function onFrame(event) {
	// Run through the active layer's children list and change
	// the position of the placed symbols:
	for (var i = 0; i < count; i++) {
		var item = project.activeLayer.children[i];
		
		// Move the item 1/20th of its width to the right. This way
		// larger circles move faster than smaller circles:
		//	to change the direction of float from left-to-right to right-to-left: change "+=" to "-="
		
		item.position.x += item.bounds.width / 20;

		// If the item has left the view on the right, move it back
		// to the left:
		if (item.bounds.left > view.size.width) {
			item.position.x = -item.bounds.width;
		}
	}
}

//============= bouncing balls at click


var Ball = function(point, vector) {
	if (!vector || vector.isZero()) {
		this.vector = Point.random() * 5;
	} else {
		this.vector = vector * 2;
	}
	this.point = point;
	this.dampen = 0.4;
	this.gravity = 3;
	this.bounce = -0.6;

	var color = {
		hue: Math.random() * 360,
		saturation: 1,
		brightness: 1
	};
	var gradient = new Gradient([color, 'black'], true);

	var radius = this.radius = 50 * Math.random() + 30;
	// Wrap CompoundPath in a Group, since CompoundPaths directly 
	// applies the transformations to the content, just like Path.
	var ball = new CompoundPath({
		children: [
			new Path.Circle({
				radius: radius
			}),
			new Path.Circle({
				center: radius / 8,
				radius: radius / 3
			})
		],
		fillColor: new Color(gradient, 0, radius, radius / 8),
	});

	this.item = new Group({
		children: [ball],
		transformContent: false,
		position: this.point
	});
}

Ball.prototype.iterate = function() {
	var size = view.size;
	this.vector.y += this.gravity;
	this.vector.x *= 0.99;
	var pre = this.point + this.vector;
	if (pre.x < this.radius || pre.x > size.width - this.radius)
		this.vector.x *= -this.dampen;
	if (pre.y < this.radius || pre.y > size.height - this.radius) {
		if (Math.abs(this.vector.x) < 3)
			this.vector = Point.random() * [150, 100] + [-75, 20];
		this.vector.y *= this.bounce;
	}

	var max = Point.max(this.radius, this.point + this.vector);
	this.item.position = this.point = Point.min(max, size - this.radius);
	this.item.rotate(this.vector.x);
};


var balls = [];
for (var i = 0; i < 10; i++) {
	var position = Point.random() * view.size,
		vector = (Point.random() - [0.5, 0]) * [50, 100],
		ball = new Ball(position, vector);
	balls.push(ball);
}

var textItem = new PointText({
	point: [20, 30],
	fillColor: 'black',
	content: 'Click, drag and release to add balls.'
});

var lastDelta;
function onMouseDrag(event) {
	lastDelta = event.delta;
}

function onMouseUp(event) {
	var ball = new Ball(event.point, lastDelta);
	balls.push(ball);
	lastDelta = null;
}

function onFrame() {
	for (var i = 0, l = balls.length; i < l; i++)
		balls[i].iterate();
}


//===================== Future splash

// Code ported to Paper.js from http://the389.com/9/1/
// with permission.

var values = {
	friction: 0.8,
	timeStep: 0.01,
	amount: 15,
	mass: 2,
	count: 0
};
values.invMass = 1 / values.mass;

var path, springs;
var size = view.size * [1.2, 1];

var Spring = function(a, b, strength, restLength) {
	this.a = a;
	this.b = b;
	this.restLength = restLength || 80;
	this.strength = strength ? strength : 0.55;
	this.mamb = values.invMass * values.invMass;
};

Spring.prototype.update = function() {
	var delta = this.b - this.a;
	var dist = delta.length;
	var normDistStrength = (dist - this.restLength) /
			(dist * this.mamb) * this.strength;
	delta.y *= normDistStrength * values.invMass * 0.2;
	if (!this.a.fixed)
		this.a.y += delta.y;
	if (!this.b.fixed)
		this.b.y -= delta.y;
};


function createPath(strength) {
	var path = new Path({
		fillColor: 'black'
	});
	springs = [];
	for (var i = 0; i <= values.amount; i++) {
		var segment = path.add(new Point(i / values.amount, 0.5) * size);
		var point = segment.point;
		if (i == 0 || i == values.amount)
			point.y += size.height;
		point.px = point.x;
		point.py = point.y;
		// The first two and last two points are fixed:
		point.fixed = i < 2 || i > values.amount - 2;
		if (i > 0) {
			var spring = new Spring(segment.previous.point, point, strength);
			springs.push(spring);
		}
	}
	path.position.x -= size.width / 4;
	return path;
}

function onResize() {
	if (path)
		path.remove();
	size = view.bounds.size * [2, 1];
	path = createPath(0.1);
}

function onMouseMove(event) {
	var location = path.getNearestLocation(event.point);
	var segment = location.segment;
	var point = segment.point;

	if (!point.fixed && location.distance < size.height / 4) {
		var y = event.point.y;
		point.y += (y - point.y) / 6;
		if (segment.previous && !segment.previous.fixed) {
			var previous = segment.previous.point;
			previous.y += (y - previous.y) / 24;
		}
		if (segment.next && !segment.next.fixed) {
			var next = segment.next.point;
			next.y += (y - next.y) / 24;
		}
	}
}

function onFrame(event) {
	updateWave(path);
}

function updateWave(path) {
	var force = 1 - values.friction * values.timeStep * values.timeStep;
	for (var i = 0, l = path.segments.length; i < l; i++) {
		var point = path.segments[i].point;
		var dy = (point.y - point.py) * force;
		point.py = point.y;
		point.y = Math.max(point.y + dy, 0);
	}

	for (var j = 0, l = springs.length; j < l; j++) {
		springs[j].update();
	}
	path.smooth({ type: 'continuous' });
}

function onKeyDown(event) {
	if (event.key == 'space') {
		path.fullySelected = !path.fullySelected;
		path.fillColor = path.fullySelected ? null : 'black';
	}
}