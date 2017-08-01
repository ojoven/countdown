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

var countermseconds = 6000;

// When socket connection
io.on('connection', function (socket) {

	socket.on('addtime', function() {
		console.log('add time!');
		emitAddTime();
	});

	emitSetTime();

});

function emitAddTime() {
	var data = { time: 100 };
	io.sockets.emit('addtime', data);
}

function emitSetTime() {
	var data = { time: countermseconds };
	io.sockets.emit('settime', data);
}

setInterval(function() {
	console.log(countermseconds);
	countermseconds--;
}, 10);