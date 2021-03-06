$(document).ready(function() {
	var socket = io();
	var input = $("input");
	var messages = $("#messages");
	var clientNumber = $("#clientNumber");
	var nickName = $("#nickName");  // like to add variable to add #

	var addMessage = function(message) {
		messages.append(`<div> ${message} </div>`);
	};

	var displayNickName = function(Name) {
		nickName.html(`<div> My Nickname is ${Name} </div>`);
	};
	var displayClientNumber = function(num) {
		clientNumber.html(`<div> Number of clients: ${num} </div>`);
	};

	input.on("keydown", function(event) {
		if (event.keyCode !== 13) {
			return;
		}

		var message = input.val();
		addMessage('Me: ' + message);
		socket.emit("message", message);
		input.val("");
	});
// // test nickName
// 	socket.emit('send-nickname', nickname);
// //  end test nickName

	socket.on("message", addMessage);
	socket.on("nickName", displayNickName);
	socket.on("clientNumber", displayClientNumber);

});


