Vue.component('action-buttons', {

	template: `
		<div id="action-buttons">
			<a id="main" :class="{ active: active }"
			class="btn main-btn"
			@mousedown="addTime()" @touchstart="addTime()"
			@touchend="removeActive()" @mouseup="removeActive"
			href="#">{{buttonText}}</a>
		</div>
  `,

	data() {
		return {
			buttonText: 'Add time!',
			active: false
		}
	},

	created: function() {

	},

	methods: {

		addTime: function() {
			socket.emit('addtime');
			this.active = true;
		},

		removeActive: function() {
			this.active = false;
		}
	}

});