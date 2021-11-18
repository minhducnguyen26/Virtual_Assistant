import { get_recorded_action } from "../virtual_assistant_actions/get_recorded_action.js";
import { update_command_suggestions } from "../web_modification/command_suggestions.js";

export function handle_actions_data(user_request) {
	let match = false;
	let reply;

	if (user_request.includes("read it to me")) {
		match = true;
		reply = "Okay";

		get_recorded_action("Read");
		update_command_suggestions(1);
	}
	//
	else if (user_request.includes("let me read it")) {
		match = true;
		reply = "Here's the answer to your question. Please let me know if this is what you are looking for";

		get_recorded_action("Show");
		update_command_suggestions(2);
	}
	//
	else if (user_request.includes("send it to my email")) {
		match = true;
		reply = "The data has been sent to your email. Please let me know if you need me to send it again";

		get_recorded_action("Email");
		update_command_suggestions(3);
	}

	return {
		match,
		reply,
	};
}
