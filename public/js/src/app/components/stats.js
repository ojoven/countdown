Vue.component('stats', {

	template: `
		<div id="stats">
			<div class="citizens" v-if="number_citizens >= 2">
				You're <span class="number">{{number_citizens}}</span> citizens<br>fighting together!
			</div>

			<div class="citizens" v-if="number_citizens < 2">
				It's just you<br>fighting against the bomb!
			</div>
		</div>
  `,

	data() {
		return {
			number_citizens: 1
		}
	},

	created: function() {

		// Catch Events
		this.catchEvents();

	},

	methods: {

		catchEvents: function() {

			var that = this;

			// Set time
			socket.on('setNumberCitizens', function(data) {
				console.log('event: set citizens', data);
				that.number_citizens = data.number_citizens;

			}.bind(this));
		}

	}

});