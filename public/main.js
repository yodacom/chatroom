$(document).ready(function() {
	var socket = io();
	var input = $("input");
	var messages = $("#messages");
	var clientNumber = $("#clientNumber");
	var nickName = $("#nickName");  // like to add variable to add #

	var addMessage = function(message) {
		messages.append(`<div> ${message} </div>`);
	};

	var displayNickName = function(nickName) {
		nickName.html(`<div> My Nickname is ${nickName} </div>`);
	};
	var displayClientNumber = function(num) {
		clientNumber.html(`<div> Number of clients: ${num} </div>`);
	};

	input.on("keydown", function(event) {
		if (event.keyCode !== 13) {
			return;
		}

		var message = input.val();
		addMessage(message);
		socket.emit("message", message);
		input.val("");
	});

	socket.on("message", addMessage);
	socket.on("nickName", displayNickName);
	socket.on("clientNumber", displayClientNumber);
});


