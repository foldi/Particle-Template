(function (exports) {
	
	var Particle = (function () {
	
		function Particle (options) {
			
			var options = options || {},
				myDiv;
			
			this.acceleration = PVector.create(0, 0);
	    this.velocity = PVector.create(0, 0);
	    this.location = PVector.create(options.World.width/2, options.World.height/2);
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
	    myDiv.id = "p-" + options.PS.idCount;
	    myDiv.style.webkitTransform = 'translateX(-5000px) translateY(-5000px) translateZ(0) scaleX(1) scaleY(1)';

	    this.el = document.body.appendChild(myDiv);

	    options.PS.idCount += 1;
	
		}
	
		Particle.prototype.step = function (world) {
      
      this.acceleration.add(world.gravity);
      this.acceleration.add(world.wind);
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
		
		return Particle;
	
	}());
	
	exports.Particle = Particle;
	
}(exports));