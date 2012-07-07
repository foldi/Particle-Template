var exports = this;

function getRandomNumber (low, high, flt) {
  if (flt) {
		return Math.random()*(high-(low-1)) + low;
	}
	return Math.floor(Math.random()*(high-(low-1))) + low;
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
	clearInterval(stats.statsInterval);
	document.body.removeChild(document.getElementById('stats'));
}