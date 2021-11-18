import { record_actions } from "../virtual_assistant_actions/record_actions.js";

export function handle_questions(user_request) {
	let match = false;
	let reply = "I have found the answer to your question: " + user_request + ". ";
	reply += "Do you want me to read it or show it to you or send it to your email?";

	if (user_request.includes("who")) {
		match = true;
		record_actions("Questions", user_request);
	}
	//
	else if (user_request.includes("what")) {
		if (
			!user_request.includes("what's your name") &&
			!user_request.includes("what can you do") &&
			!user_request.includes("+") &&
			!user_request.includes("-") &&
			!user_request.includes("*") &&
			!user_request.includes("/") &&
			!user_request.includes("square root")
		) {
			match = true;
			record_actions("Questions", user_request);
		}
	}
	//
	else if (user_request.includes("where")) {
		match = true;
		record_actions("Questions", user_request);
	}
	//
	else if (user_request.includes("when")) {
		match = true;
		record_actions("Questions", user_request);
	}
	//
	else if (user_request.includes("why")) {
		match = true;
		record_actions("Questions", user_request);
	}
	//
	else if (user_request.includes("how")) {
		if (!user_request.includes("how's it going")) {
			match = true;
			record_actions("Questions", user_request);
		}
	}

	return {
		match,
		reply,
	};
}
