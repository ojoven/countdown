/** APP **/
// Node app

// ROOT PATH
var path = require('path');
global.appRoot = path.resolve(__dirname);

// Initialize express
var express = require('express'),
	app = express();

var port = process.env.PORT || 8001;

// Libs
//var twitterStream = require("./app/lib/twitterStream.js");

// Initialize a new socket.io object. It is bound to
// the express app, which allows them to coexist.
var io = require('socket.io').listen(app.listen(port));

// Models
var Timer = require("./app/models/Timer.js");
var Emitter = require("./app/models/Emitter.js");

// Require the configuration and the routes files, and pass
// the app and io as arguments to the returned functions.
require('./config')(app, io);
require('./routes')(app, io);

// Logging
console.log('Your application is running on http://localhost:' + port);

// When socket connection
io.on('connection', function (socket) {

	Emitter.initialize(io);

	// Specific sockets (clients)
	io.to(socket.id).emit('setTime', { time: Timer.time, type: 'initial' });

	// Broadcast
	socket.on('addtime', function() {
		console.log('add time!');
		Timer.time += 100;
		Emitter.emitSetTime(Timer.time, 'add', Timer.step);
	});

	//Emitter.emitSetTime(Timer.time, 'initial', 0);

});

Timer.runTimerInterval();