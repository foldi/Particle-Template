/*global exports, window, PVector, setInterval, clearInterval */
(function (exports) {
	
	'use strict';
			
	var World = (function () {
	
		function World() {
			
			var opts = this.getOptions() || {};
			
			this.width = opts.width || window.innerWidth;
		  this.height =  opts.height || window.innerHeight;
		  this.gravity = typeof opts.gravityX !== 'undefined' && typeof opts.gravityY !== 'undefined' ? PVector.create(opts.gravityX, opts.gravityY) : PVector.create(0, 0);
			this.framerate = opts.framerate || 16;
			
			if (window.addEventListener) {
				var me = this;
				window.addEventListener("devicemotion", function (e) { // listens for device motion events
					me.devicemotion.call(me, e);
				}, false);
			}
			
		}
		
		World.prototype.getOptions = function () {
			return exports.worldOptions;
		}
		
		World.prototype.elements = [];
		World.prototype.clock = 0;
		
		World.prototype.stepSystem = function (elements, world) {
			return function () {
				var i;

		    for (i = elements.length - 1; i >= 0; i -= 1) {
		      if (!elements[i].dead) {
		        elements[i].step(world);
		        elements[i].draw();
		      } else {
		        elements[i].destroy(elements);
		      }
		    }
				world.clock += 1;
			};
		};
		
		World.prototype.start = function () {
			this.funcRef = this.stepSystem(this.elements, this);
			this.interval = setInterval(this.funcRef, this.framerate);
		};

		World.prototype.stop = function () {
			clearInterval(this.interval);
			this.interval = null;
		};
				
		World.prototype.devicemotion = function (e) {
			if (window.orientation === 0) {
				this.gravity = PVector.create(e.accelerationIncludingGravity.x * 0.01, e.accelerationIncludingGravity.y * -0.01); // portrait
			} else if (window.orientation === -90) {
				this.gravity = PVector.create(e.accelerationIncludingGravity.y * 0.01, e.accelerationIncludingGravity.x * 0.01);
			} else {
				this.gravity = PVector.create(e.accelerationIncludingGravity.y * -0.01, e.accelerationIncludingGravity.x * -0.01);
			}
		};
		
		return World;
	
	}());
	
	exports.World = World;
	
}(exports));