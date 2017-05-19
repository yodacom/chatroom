var socket_io = require("socket.io");
var http = require("http");
var express = require("express");

var app = express();
app.use(express.static("public"));

var server = http.Server(app);
var io = socket_io(server);
var clientNumber = 0;
var clientNickname = 0;

io.on("connection", function(socket) {
	console.log("Client connected", socket.id);
	clientNumber++;
	clientNickname++; // add number to end of nickname
	socket.nickName = `nickname ${clientNickname}`;
	socket.emit("nickName", `nickname ${clientNickname}`);
	io.emit("clientNumber", clientNumber);

	socket.on("message", function(message) {
		console.log("Received Message:", message);
		socket.broadcast.emit("message", `${socket.nickName}: ${message}`);
	});
	socket.on("disconnect", function() {
		clientNumber--;
		io.emit("clientNumber", clientNumber);
	});
// // test nickname =========
// 	io.on("connection", function(socket) {
// 		socket.on("send-nickname", function(nickname) {
// 			socket.nickname = nickname;
// 			users.push(socket.nickname);
// 			console.log(users);
// 		});
// 	});
// // end test nickname ======

});

server.listen(process.env.PORT || 8080);
