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
	},

	emitNumberCitizens: function(clients) {
		var number_citizens = clients.length;
		var data = { number_citizens: number_citizens };
		this.io.sockets.emit('setNumberCitizens', data);
	}

};

// Emit
module.exports = Emitter;

