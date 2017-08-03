/** TIMER **/

var Emitter = require("./Emitter.js");

var Timer = {

	timerInterval: false,
	step: 10,
	timeToNextTimer: 1000,
	initialTime: 6000,
	time: 0,
	emitter: false,

	// Initialize
	initialize: function() {
		this.time = this.initialTime;
	},

	// Timer Interval
	runTimerInterval: function() {

		var timer = this;
		timer.initialize();

		this.timerInterval = setInterval(function() {

			timer.runTimer();

		}, timer.step);
	},

	// Run Timer
	runTimer: function() {

		var timer = this;

		if (timer.time <= 0) {
			clearInterval(timer.timerInterval);

			setTimeout(function() {
				timer.time = timer.initialTime;
				Emitter.emitSetTime(timer.time, 'initial', 0);
				timer.runTimerInterval();
			}, timer.timeToNextTimer);
		}

		console.log(timer.time);
		timer.time--;
	}

};

module.exports = Timer;

