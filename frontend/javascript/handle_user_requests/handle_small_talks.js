export function handle_small_talks(user_request) {
	let match = false;
	let reply;

	if (user_request.includes("hello")) {
		match = true;
		reply = "Greeting, how may I help you today";
	}
	//
	else if (user_request.includes("how's it going")) {
		match = true;
		reply = "I'm doing great, thank you for asking. How are you";
	}
	//
	else if (user_request.includes("what's your name") || user_request.includes("introduce yourself")) {
		match = true;
		reply = "My name is Mini Minh, and I am your virtual assistant";
	}
	//
	else if (user_request.includes("what can you do")) {
		match = true;
		reply = "I can do some basic calculations and a good amount of tasks, and I am learning to become more helpful.";
	}

	return {
		match,
		reply,
	};
}
