/*global exports, PVector, document */
(function (exports) {
	
	'use strict';
	
	var Particle = (function () {
	
		function Particle(opts) {
			
			var i, myDiv, options = opts || {};
			
			for (i in options) {
				if (options.hasOwnProperty(i)) {	
					this[i] = options[i];
				}
			}
		
			myDiv = options.view();
			myDiv.id = this.id;
	    this.el = document.body.appendChild(myDiv);

		}
	
		Particle.prototype.step = function () {
      
      this.acceleration.add(exports.world.gravity);
      this.acceleration.add(exports.world.wind);
      this.velocity.add(this.acceleration);
      this.location.add(this.velocity);
    
      this.life += 1;
      if (this.life > this.lifeMax) {
        this.dead = true;
      }
    };

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
	       style.background = cm + "(" + c[0] + ", " + c[1] + ", " + c[2] + ")";

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