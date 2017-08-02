/** EMITTER **/

var Emitter = {
	io: false,

	// Initialize
	initialize: function(io) {
		this.io = io;
	},

	// Set Time
	emitSetTime: function(time, type, value) {
		var data = { time: time, type: type, value: value };
		this.io.sockets.emit('setTime', data);
	}

};

// Emit
module.exports = Emitter;

