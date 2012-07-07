/*global exports, setInterval, clearInterval, document, PVector, getRandomNumber */
(function (exports) {
	
	'use strict';
	
	var ParticleSystem = (function () {

		function ParticleSystem(opts) {
			
			var options = opts || {};
			
			this.particleOptions = options.particleOptions;
			this.burst = options.burst || 1;
			
			//
			
			this.acceleration = options.acceleration || PVector.create(0, 0);
	    this.velocity = options.velocity || PVector.create(0, 0);
	    this.location = options.location || PVector.create(exports.world.width/2, exports.world.height/2);
	    this.scale = options.scale || 1;
	    this.opacity = options.opacity || 1;
	    this.life = options.life || 0;
	    this.lifeMax = options.lifeMax || 50;
	    this.width = typeof options.width !== "undefined" ? options.width : 10;
	    this.height = typeof options.height !== "undefined" ? options.height : 10;
	    this.colorMode = options.colorMode || "rgb";
	    this.color = options.color || [255, 0, 0];
	    this.mass = options.mass || 10;

			this.view = options.view || function () {
				var myDiv;
				myDiv = document.createElement("div"); // create element
		    myDiv.className = "particle";
		    myDiv.style.webkitTransform = 'translateX(-5000px) translateY(-5000px) translateZ(0) scaleX(1) scaleY(1)';
				return myDiv;
			};
			
		}
		
		ParticleSystem.prototype.idCount = 0;
		
		ParticleSystem.prototype.getOpts = function () {
			var opts = {};
			opts.acceleration = this.acceleration.clone();
			opts.velocity = this.velocity.clone();
			opts.location = this.location.clone();
			opts.scale = this.scale;
			opts.opacity = this.opacity;
			opts.life = this.life;
			opts.lifeMax = this.lifeMax;
			opts.width = this.width;
			opts.height = this.height;
			opts.colorMode = this.colorMode;
			opts.color = [];
			opts.color[0] = Math.floor(this.color[0]);
			opts.color[1] = Math.floor(this.color[1]);
			opts.color[2] = Math.floor(this.color[2]);
			opts.mass = this.mass;
			opts.view = this.view;
			opts.id = this.idCount;
			return opts;
		};
		
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
						ps.launchParticle(new exports.Particle(ps.getOpts()));
					}
				} else {
					if (exports.world.clock % ps.burst === 0) {
						ps.launchParticle(new exports.Particle(ps.getOpts()));
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