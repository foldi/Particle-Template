/*global window, PVector, setInterval, document */




var exports = this;



/*function setup (App) {
  
	function getRandomNumber (low, high, flt) {
	  if (flt) {
			return Math.random()*(high-(low-1)) + low;
		}
		return Math.floor(Math.random()*(high-(low-1))) + low;
	}
	
	function World () {
		this.width = window.innerWidth;
	  this.height = window.innerHeight;
	  this.gravity = PVector.create(0, 0.01);
	  this.wind = PVector.create(0.01, 0);
	}
	
	World.prototype.devicemotion = function () {
		var e = arguments[0];
		if (window.orientation === 0) {
			this.gravity = PVector.create(e.accelerationIncludingGravity.x * .01, e.accelerationIncludingGravity.y * -.01); // portrait
		} else if (window.orientation === -90) {
			this.gravity = PVector.create(e.accelerationIncludingGravity.y * .01, e.accelerationIncludingGravity.x * .01);
		} else {
			this.gravity = PVector.create(e.accelerationIncludingGravity.y * -.01, e.accelerationIncludingGravity.x * -.01);
		}
	};

	function ParticleSystem (world) {
		
		var funcRef;
		
	  this.particles = [];
	  this.idCount = 0;
		this.world = world;
		
		function stepSystem(particles, world) {
			
			return function () {
				var i;

		    for (i = particles.length - 1; i >= 0; i -= 1) {
		      if (!particles[i].dead) {
		        particles[i].step(world);
		        particles[i].draw();
		      } else {
		        particles[i].destroy(particles);
		      }
		    }
			};
			
		};
		
		funcRef = stepSystem(this.particles, this.world);
	
		this.interval = setInterval(funcRef, 16);
	
	};

	function Particle (world, ps) {
		
		var myDiv;
    
    this.acceleration = PVector.create(0, 0);
    this.velocity = PVector.create(0, 0);
    this.location = PVector.create(world.width/2, world.height/2);
    this.scale = 1;
    this.opacity = 1;
    this.life = 0;
    this.lifeMax = 50;
    this.width = 10;
    this.height = 10;
    this.colorMode = "rgb";
    this.color = {
      r: 255,
      g: 0,
      b: 0
    };
    this.mass = 10;

    myDiv = document.createElement("div"); // create element
    myDiv.className = "particle";
    myDiv.id = "p-" + ps.idCount;
    myDiv.style.webkitTransform = 'translateX(-5000px) translateY(-5000px) translateZ(0) scaleX(1) scaleY(1)';

    this.el = document.body.appendChild(myDiv);

    ps.idCount += 1;

    this.step = function (world) {
      
      this.acceleration.add(world.gravity);
      this.acceleration.add(world.wind);
      this.velocity.add(this.acceleration);
      this.location.add(this.velocity);
    
      this.life += 1;
      if (this.life > this.lifeMax) {
        this.dead = true;
      }
    };
	}
  
	Particle.prototype.draw = function () {
    
      var x = this.location.x - this.width/2,
        y = this.location.y - this.height/2,
        s = this.scale,
        o = this.opacity,
        w = this.width,
        h = this.height,
        cm = this.colorMode,
        c = this.color, 
        style = this.el.style;
      
       style.webkitTransform = 'translateX(' + x + 'px) translateY(' + y + 'px) translateZ(0) scaleX(' + s + ') scaleY(' + s + ')';
       style.MozTransform = 'translateX(' + x + 'px) translateY(' + y + 'px) translateZ(0) scaleX(' + s + ') scaleY(' + s + ')'; 
       style.OTransform = 'translateX(' + x + 'px) translateY(' + y + 'px) translateZ(0) scaleX(' + s + ') scaleY(' + s + ')';       
       style.opacity = o;
       style.width = w + "px";
       style.height = h + "px";
       style.background = cm + "(" + c.r + ", " + c.g + ", " + c.b + ")";
      
    };

	Particle.prototype.destroy = function (particles) {
     var i;
     if (this.el) {
       document.body.removeChild(this.el);
     }
     for (i = particles.length - 1; i >= 0; i -= 1) {
       if (particles[i].el.id === this.el.id) {
         particles.splice(i, 1);
         break;
       }
     }
     
   };
   Particle.prototype.applyForce = function (force) { // F = M * A

      var f = force.clone();

      f.div(this.mass);
      this.acceleration.add(f);
   };
	
	world = new World();
	ps = new ParticleSystem(world);
	
	if (window.addEventListener) {
		window.addEventListener("devicemotion", function (e) { // listens for device motion events
			world.devicemotion.call(world, e);
		}, false);
	}
	
  setInterval(function () {

		var particle = new Particle(world, ps);

    particle.applyForce(PVector.create(getRandomNumber(-2, 2, true), getRandomNumber(-2, 0, true)));
    ps.particles.push(particle);

  }, 50);

};*/
