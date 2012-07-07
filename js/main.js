var exports = this;

function getRandomNumber (low, high, flt) {
  if (flt) {
		return Math.random()*(high-(low-1)) + low;
	}
	return Math.floor(Math.random()*(high-(low-1))) + low;
}

function isTouchDevice() {
   var el = document.createElement('div');
   el.setAttribute('ongesturestart', 'return;');
   if(typeof el.ongesturestart == "function"){
      return true;
   }else {
      return false
   }
}

function clone (object) {
	function F() {}
	F.prototype = object;
	return F;
}

function createStats () {

	stats = new Stats();

	stats.getDomElement().style.position = 'absolute'; // Align top-left
	stats.getDomElement().style.left = '0px';
	stats.getDomElement().style.top = '0px';
	stats.getDomElement().id = 'stats';

	document.body.appendChild(stats.getDomElement());

	stats.statsInterval = setInterval(function () {
	    stats.update();
	}, 1000 / 60);
};

function destroyStats () {
	var s = document.getElementById('stats');
	clearInterval(stats.statsInterval);
	if (s) {
		document.body.removeChild(s);
	}
}

