/** LIBRARY **/
// We'll use this vue instance as the functions.js where we'll put some functions
// that are shared across the different components

const lib = new Vue({
	methods: {

		str_pad_left: function(string, pad) {
			var str = "" + string;
			var ans = pad.substring(0, pad.length - str.length) + str;
			return ans;
		},
	}
});