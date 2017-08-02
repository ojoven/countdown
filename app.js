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

// Models

// Initialize a new socket.io object. It is bound to 
// the express app, which allows them to coexist.
var io = require('socket.io').listen(app.listen(port));

// Require the configuration and the routes files, and pass
// the app and io as arguments to the returned functions.
require('./config')(app, io);
require('./routes')(app, io);

// Logging
console.log('Your application is running on http://localhost:' + port);

var initialTime = 600;
var time = initialTime;
var timerInterval = false;

// When socket connection
io.on('connection', function (socket) {

	socket.on('addtime', function() {
		console.log('add time!');
		emitSetTime('add', 10);
	});

	emitSetTime('initial', 0);

});

function emitSetTime(type, value) {

	var data = { time: time, type: type, value: value };
	io.sockets.emit('setTime', data);
}

function runTimerInterval() {

	timerInterval = setInterval(function() {

		runTimer();

	}, 10);
}

function runTimer() {

	if (time <= 0) {
		clearInterval(timerInterval);

		setTimeout(function() {
			time = initialTime;
			emitSetTime('initial', 0);
			runTimerInterval();
		}, 1000);
	}

	console.log(time);
	time--;
}

runTimerInterval();