/*global exports, PVector, document */
(function (exports) {
	
	'use strict';
	
	var Particle = (function () {
	
		function Particle(id) {
			
			var myDiv,
			opts = this.getOptions() || {};
			
			this.id = id;
			this.className = opts.className || "particle";
			this.width = opts.width || 10;
			this.height = opts.height || 10;
			this.jitterX = opts.jitterX || getRandomNumber(-this.width/2, this.width/2);
			this.jitterY = opts.jitterY || getRandomNumber(-this.height/2, this.height/2);
			this.acceleration = opts.acceleration || PVector.create(0, 0);
	    this.velocity = opts.velocity || PVector.create(0, 0);
	    this.location = opts.location || PVector.create(exports.world.width/2 + this.jitterX, exports.world.height/2 + this.jitterY);
			this.angle = 0;
			this.scale = opts.scale || 1;
			this.opacity = opts.opacity || 0.75;
			this.mass = opts.mass || 10;
			this.colorMode = opts.colorMode || "rgb";
			this.color = [];
			this.color[0] = typeof opts.color !== 'undefined' ? Math.floor(opts.color[0]) : 255;
			this.color[1] = typeof opts.color !== 'undefined' ? Math.floor(opts.color[1]) : 0;
			this.color[2] = typeof opts.color !== 'undefined' ? Math.floor(opts.color[2]) : 0;
			this.life = 0;
			this.lifeMax = opts.lifeMax || 50;
			this.view = opts.view || function () {
				var myDiv;
				myDiv = document.createElement("div"); // create element
		    myDiv.style.webkitTransform = 'translateX(-5000px) translateY(-5000px) translateZ(0) scaleX(1) scaleY(1)';
				return myDiv;
			};
	
			myDiv = this.view();
			myDiv.id = this.id;
			myDiv.className = this.className;
	    this.el = document.body.appendChild(myDiv);

		}

		Particle.prototype.getOptions = function () {
			return exports.particleOptions;
		}
		
		Particle.prototype.step = function () {
      
      this.acceleration.add(exports.world.gravity);
      this.velocity.add(this.acceleration);
      this.location.add(this.velocity);
			this.angle = this.location.x;
    
      this.life += 1;
      if (this.life > this.lifeMax) {
        this.dead = true;
      }
    };

		Particle.prototype.draw = function () {

	      var x = this.location.x - this.width/2,
	        y = this.location.y - this.height/2,
	        s = this.scale,
					a = this.angle,
	        o = this.opacity,
	        w = this.width,
	        h = this.height,
	        cm = this.colorMode,
	        c = this.color, 
	        style = this.el.style;

	       style.webkitTransform = 'translateX(' + x + 'px) translateY(' + y + 'px) translateZ(0) scaleX(' + s + ') scaleY(' + s + ') rotate(' + a + 'deg)';
	       style.MozTransform = 'translateX(' + x + 'px) translateY(' + y + 'px) scaleX(' + s + ') scaleY(' + s + ') rotate(' + a + 'deg)'; 
	       style.OTransform = 'translateX(' + x + 'px) translateY(' + y + 'px) scaleX(' + s + ') scaleY(' + s + ') rotate(' + a + 'deg)';       
	       style.opacity = o;
	       style.width = w + "px";
	       style.height = h + "px";
	       style.background = cm + (typeof c[0] !== "undefined" ? "(" + c[0] + ", " + c[1] + ", " + c[2] + ")" : "");

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
		
		return Particle;
	
	}());
	
	exports.Particle = Particle;
	
}(exports));