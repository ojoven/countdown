Vue.component('countdown', {

	template: `
		<div id="countdown">
			<span class="count-num">{{countHTML}}</span>
		</div>
  `,

	data() {
		return {
			countHTML: 6000,
			count: 6000,
			counter: false
		}
	},

	created: function() {

		// Set Timer
		this.startTimer();

		// Add Time
		this.addTimeIfEvent();
	},

	methods: {

		startTimer: function() {
			this.counter = setInterval(this.timer, 10);
		},

		timer: function() {

			if (this.count <= 0) {
				clearInterval(this.counter);
				return;
			}
			this.count--;
			var time = Math.floor(this.count / 100);
			var minutes = Math.floor(time / 60);
			var secondsAndMilliseconds = (this.count / 100 - minutes * 60).toFixed(2);
			var secondsAndMillisecondsArray = secondsAndMilliseconds.split('.');
			var seconds = secondsAndMillisecondsArray[0];
			var milliseconds = secondsAndMillisecondsArray[1];

			this.countHTML = lib.str_pad_left(minutes, '00') + ':' + lib.str_pad_left(seconds, '00') + ':' + lib.str_pad_left(milliseconds, '00');

		},

		addTimeIfEvent: function() {

			// When we receive it, let's update the user
			socket.on('addtime', function(data) {
				this.count += data.time;
			}.bind(this));

		}

	}

});