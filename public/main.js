$(document).ready(function(){
	var input = $("input");
	var messages = $("messages");

	var addMessage = function(message){
		messages.append("<div>" + message + "</div>");
	};

	input.on("keydown", function(event){
		if (event.keyCode !== 13) {
			return;
		} 
		var message = input.val();
		addMessage(message);
		input.val(" ");
	});

});