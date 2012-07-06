(function (exports) {
	
	var ParticleSystem = (function () {
		
		var funcRef;
		
		function ParticleSystem (options) {
			
			var options = options || {};
			
			this.particles = [];
		  this.idCount = 0;
			this.world = options.World;
		}
	
		ParticleSystem.prototype.stepSystem = function (particles, world) {
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
		
		ParticleSystem.prototype.start = function () {
			funcRef = this.stepSystem(this.particles, this.world);
			this.interval = setInterval(funcRef, 16);
		};
		
		return ParticleSystem;
	
	}());
	
	exports.ParticleSystem = ParticleSystem;
	
}(exports));