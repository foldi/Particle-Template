(function (exports) {
	
	var World = (function () {
	
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
		
		return World;
	
	}());
	
	exports.World = World;
	
}(exports));