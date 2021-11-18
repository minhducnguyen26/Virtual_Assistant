export function handle_emotions(user_request) {
	let match = false;
	let reply;

	if (user_request.includes("I'm happy")) {
		match = true;
		reply = "I'm glad to hear that. Thank you for sharing it with me";
	}
	//
	else if (user_request.includes("I'm sad")) {
		match = true;
		reply = "I'm always here for you. Let me know if I can do anything to help";
	}
	//
	else if (user_request.includes("I'm angry")) {
		match = true;
		reply = "Who made you mad? Give me a name and I'll handle the rest for you";
	}
	//
	else if (user_request.includes("I'm depressed")) {
		match = true;
		reply = "Thank you for sharing it with me. Do you want to talk about it? I’m here when you’re ready";
	}
	//
	else if (user_request.includes("I'm impressed")) {
		match = true;
		reply = "Thank you, that makes me happy";
	}

	return {
		match,
		reply,
	};
}
