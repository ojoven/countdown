/** TIMER **/

var Timer = {

	timerInterval: false,
	step: 10,
	timeToNextTimer: 1000,
	initialTime: 600,
	time: 0,
	emitter: false,

	// Initialize
	initialize: function() {
		this.time = this.initialTime;
	},

	// Attach Emitter
	attachEmitter: function(emitter) {
		this.emitter = emitter;
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
				this.emitter.emitSetTime('initial', 0);
				timer.runTimerInterval();
			}, timer.timeToNextTimer);
		}

		console.log(timer.time);
		timer.time--;
	}

};

module.exports = Timer;

