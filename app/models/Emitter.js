/** EMITTER **/

var Emitter = {};

// Emit Set Time
Emitter.emitSetTime = function(io, time, type, value) {

	var data = { time: time, type: type, value: value };
	io.sockets.emit('setTime', data);
};

module.exports = Emitter;

