var socket_io = require("socket.io");
var http = require("http");
var express = require("express");

var app = express();
app.use(express.static("public"));

var server = http.Server(app);
var io = socket_io(server);

io.on("connection", function(socket){
    console.log("Client connected");
}):

server.listen(process.env.PORT || 8080);