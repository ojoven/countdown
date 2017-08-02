/** TIMER **/

var Timer = {};
Timer.timerInterval = false;
Timer.step = 10;
Timer.timeToNextTimer = 1000;
Timer.initialTime = 600;
Timer.time = Timer.initialTime;

// Timer Interval
Timer.runTimerInterval = function() {

	var timer = this;

	this.timerInterval = setInterval(function() {

		timer.runTimer();

	}, timer.step);
};

// Run Timer
Timer.runTimer = function() {

	var timer = this;

	if (timer.time <= 0) {
		clearInterval(timer.timerInterval);

		setTimeout(function() {
			timer.time = timer.initialTime;
			//emitSetTime('initial', 0);
			timer.runTimerInterval();
		}, timer.timeToNextTimer);
	}

	console.log(timer.time);
	timer.time--;
};

module.exports = Timer;

