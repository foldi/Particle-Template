/*global exports, setInterval, clearInterval, document, PVector, getRandomNumber */
(function (exports) {
	
	'use strict';
	
	var ParticleSystem = (function () {

		function ParticleSystem(opts) {
			
			var opts = this.getOptions() || {};
			
			this.burst = opts.burst || 1;
			
		}
		
		ParticleSystem.prototype.getOptions = function () {
			return exports.particleSystemOptions;
		}
		
		ParticleSystem.prototype.idCount = 0;
		
		ParticleSystem.prototype.launchParticle = function (particle) {
			particle.applyForce(PVector.create(getRandomNumber(-2, 2, true), getRandomNumber(-2, 0, true)));
			exports.world.elements.push(particle);
			this.idCount += 1;
		};
		
		ParticleSystem.prototype.createParticles = function (ps) {

			return function () {
			
				var i, max;
											
				if (ps.burst > 0) {
					for (i = 0, max = ps.burst; i < max; i += 1) {
						ps.launchParticle(new exports.Particle(ps.idCount));
					}
				} else {
					if (exports.world.clock % ps.burst === 0) {
						ps.launchParticle(new exports.Particle(ps.idCount));
					}
				}
			};
		};
		
		ParticleSystem.prototype.start = function () {
			var funcRef = this.createParticles(this);
			this.interval = setInterval(funcRef, 16); // using funcRef/closure to maintain reference to "this" instance of ParticleSystem
		};
		
		ParticleSystem.prototype.stop = function () {
			clearInterval(this.interval);
			this.interval = null;
		};
		
		return ParticleSystem;
	
	}());
	
	exports.ParticleSystem = ParticleSystem;
	
}(exports));