var INTERVAL = 1;
var MASK_RADIUS = 299;
var SECONDS_IN_DAY = 60 * 60 * 24;

function getRotation(seconds) {
	return 2 * Math.PI * seconds / SECONDS_IN_DAY;
}
document.addEventListener('DOMContentLoaded', function(){
	var clockImage = document.getElementById('clock-image');
	var clockCanvas = document.getElementById('clock-canvas');
	clockCanvas.width = clockImage.width;
	clockCanvas.height = clockImage.height;
	setInterval(function() {
		var clockCanvasContext = clockCanvas.getContext('2d');
		clockCanvasContext.clearRect(0, 0, clockCanvas.width, clockCanvas.height);
		clockCanvasContext.drawImage(clockImage, 0, 0);
		clockCanvasContext.save();
		var date = new Date();
		var seconds = date.getUTCSeconds();
		seconds += date.getUTCMinutes() * 60;
		seconds += date.getUTCHours() * 3600;
		clockCanvasContext.beginPath();
		clockCanvasContext.arc(clockCanvas.width / 2, clockCanvas.height / 2, MASK_RADIUS, 0, 2 * Math.PI, false);
		clockCanvasContext.clip();
		clockCanvasContext.translate(clockCanvas.width / 2, clockCanvas.height / 2);
		clockCanvasContext.rotate(getRotation(seconds));
		clockCanvasContext.drawImage(clockImage, -clockCanvas.width / 2, -clockCanvas.height / 2);
		clockCanvasContext.restore();
	}, INTERVAL * 1000);
});