Vue.component('main-view', {

	template: `
		<div id="main-view">

			<!-- MESSAGES -->
			<div v-show="showMessage">
				<messages></messages>
			</div>

			<!-- COUNTDOWN -->
			<div v-show="showCountdown">
				<countdown></countdown>
			</div>

			<!-- THE END MESSAGE -->
			<div v-show="showEnd">
				<div class="end">
					<span class="title">THE END!</span>
					<img class="explosion" src="/img/explosion.png" />
					<span class="description">All humans are now dead.</span>
				</div>
			</div>

			<!-- ACTION BUTTONS -->
			<div v-show="showButton">
				<action-buttons></action-buttons>
			</div>

			<!-- STATS -->
			<div id="stats-container" v-show="showStats">
				<stats></stats>
			</div>

		</div>
  `,

	data() {
		return {
			showMessage: true,
			showCountdown: true,
			showButton: true,
			showStats: true,
			showEnd: false
		}
	},

	created: function() {

		var that = this;

		// INITIALIZE
		bus.$on('inittime', function() {
			that.showMessage = true;
			that.showCountdown = true;
			that.showButton = true;
			that.showStats = true;
			that.showEnd = false;
		});

		// END TIME
		bus.$on('endtime', function() {
			that.showMessage = false;
			that.showCountdown = false;
			that.showButton = false;
			that.showStats = false;
			that.showEnd = true;
		});
	},

	methods: {

	}

});