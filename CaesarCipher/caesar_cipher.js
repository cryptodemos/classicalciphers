// Global variable
var wheel = null;
var outerWords = null;
var context = null;
var degrees = 0;
var bTurning = false;
var timer = null;
var bClockwise = true;

function init() {
	var canvas = document.getElementById('caesarWheel');

	if(canvas.getContext('2d')) {
		context = canvas.getContext('2d');

		// load outerWords
		outerWords = new Image();
  	outerWords.src = 'caesarOuterWords.png';

		// load wheel
		wheel = new Image();
		wheel.src = 'caesarWheel.png';
		wheel.onload = draw;

		setInterval(checkForShiftChange, 500);
	}
  else {
  		alert("Canvas not supported!");
  }

}

function checkForShiftChange() {
	// calculate the angle to rotate
	var expectedAngle = getRequiredAngle();

	if(expectedAngle != degrees) {
		if(bTurning)
			stopTimer();

		// determine cw or anti-cw
		bClockwise = expectedAngle > degrees;

		timer = setInterval(draw, 50);
		bTurning = true;
	}
}

function getRequiredAngle() {
	// get selected number of shifts
	var shift = document.getElementById('shift');
	var expectedAngle = 0;
	var shiftInput = 0;

	if(shift != null) {
		shiftInput = shift.value * 1.0;

		// calculate the angle to rotate
		expectedAngle =  Math.floor(((360/26) * (shiftInput % 26)),0);
	}
	return expectedAngle;
}

function draw() {
	var expectedAngle = getRequiredAngle();

	calculateNewAngle(expectedAngle);

	clearCanvas();

	context.drawImage(wheel, 0, 0);
	context.save();
	context.translate(245, 264);
	// rotate about this point
	context.rotate((0-degrees) * (Math.PI / 180));
	// draw outerWords
	context.drawImage(outerWords, -245, -264);
	context.restore();

}

function calculateNewAngle(expectedAngle) {
	// stop when rotate is correct
	if(expectedAngle == degrees) {
		stopTimer();
		return;
	}

	if(bClockwise) {
		degrees += 3;
		if(degrees > 360)
			degrees = 0;
		// check current angle is more than expected angle
		if(degrees > expectedAngle)
			degrees = expectedAngle
	}
	else {
		degrees -= 3;

		if(degrees < 0) {
			if(expectedAngle == 0)
				degrees = 0;
			else
				degrees = 360;
		}

		if(degrees < expectedAngle)
			degrees = expectedAngle
	}
}

function clearCanvas() {
	context.clearRect(0, 0, 500, 500);
}

function stopTimer() {
	clearTimeout(timer);
	bTurning=false;
}

function startTimer() {
	clearTimeout(timer);
	bTurning=false;
}
