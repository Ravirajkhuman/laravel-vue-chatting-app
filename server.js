var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var redis = require('redis');
require('dotenv').config()

const APP_PORT = "6379";

server.listen(6999, () => {
	console.log("Server running at " + 6999);
});

io.on('connection', function (socket) {

	console.log('Client connected');

	socket.on('pong', function (data) {
    	console.log(data);
  	});

	var redisClient = redis.createClient();

	redisClient.subscribe('new_user_joined_event');
	redisClient.subscribe('new_chat_sent');

	redisClient.on("message", function (channel, message) {
		socket.emit(channel, message);
	});

	redisClient.on('disconnect', function () {
		redisClient.quit();
	});
});
