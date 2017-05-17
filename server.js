var socket_io = require("socket.io");
var http = require("http");
var express = require("express");

var app = express();
app.use(express.static("public"));

var server = http.Server(app);
var io = socket_io(server);
var clientNumber = 0;

io.on("connection", function(socket){
	console.log("Client connected");
	clientNumber++;
    io.emit("clientNumber", clientNumber);

	socket.on("message", function(message){
		console.log("Received Message:", message);
		socket.broadcast.emit("message", message);
	});

	socket.on("disconnect", function(){
		clientNumber--;
        io.emit("clientNumber", clientNumber);
    });
});

server.listen(process.env.PORT || 8080);