Vue.component('countdown', {

	template: `
		<div id="countdown">
			<div class="loader" v-show="showLoader"></div>
			<div class="count-num" v-show="showTime">{{timeHTML}}</div>
			<div class="end" v-show="showEnd">THE END! All humans are dead :(</div>
		</div>
  `,

	data() {
		return {
			time: false,
			timeHTML: '',
			timerInterval: false,
			timeStep: 10,

			showTime: false,
			showLoader: true,
			showEnd: false
		}
	},

	created: function() {

		// Catch Events
		this.catchEvents();

		// Emit Events
		this.emitEvents();
	},

	methods: {

		// Timer functions
		startTimer: function() {
			this.timerInterval = setInterval(this.runTimer, this.timeStep);
		},

		runTimer: function() {

			if (this.time && this.time <= 0) {
				this.endTime();
				return;
			}

			this.time--;
			this.renderTime();
		},

		// Catch Events
		catchEvents: function() {

			var countdown = this;

			// Add Time
			socket.on('addTime', function(data) {
				countdown.setTime(data);
				console.log('event: add time', data);
			}.bind(this));

			// Set time
			socket.on('setTime', function(data) {
				countdown.setTime(data);
				console.log('event: set time', data);
			}.bind(this));

		},

		// Emit Events
		emitEvents: function() {

			socket.emit('getTime');
		},

		// Functions
		renderTime: function() {

			var time = Math.floor(this.time / 100);
			var minutes = Math.floor(time / 60);
			var secondsAndMilliseconds = (this.time / 100 - minutes * 60).toFixed(2);
			var secondsAndMillisecondsArray = secondsAndMilliseconds.split('.');
			var seconds = secondsAndMillisecondsArray[0];
			var milliseconds = secondsAndMillisecondsArray[1];

			this.timeHTML = lib.str_pad_left(minutes, '00') + ':' + lib.str_pad_left(seconds, '00') + ':' + lib.str_pad_left(milliseconds, '00');
		},

		setTime: function(data) {
			this.time = data.time;

			if (data.type == 'initial') {
				this.showLoader = false;
				this.showTime = true;
				this.showEnd = false;
				this.startTimer();
			}
		},

		endTime: function() {
			clearInterval(this.timerInterval);

			this.showTime = false;
			this.showEnd = true;
		}

	}

});