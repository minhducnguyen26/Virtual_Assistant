import { show_pop_up_template } from "../web_modification/pop_up_templates/handle_pop_up.js";
import { hide_pop_up_template } from "../web_modification/pop_up_templates/handle_pop_up.js";

import { clear_actions_list } from "../virtual_assistant_actions/clear_actions_list.js";

export function handle_page_buttons(user_request) {
	let match = false;
	let reply;

	//! Guide button
	if (user_request.includes("open guide")) {
		match = true;
		reply = "Opening guide";

		show_pop_up_template("guide");
	}
	//
	else if (user_request.includes("hide guide")) {
		match = true;
		reply = "Closing guide";

		hide_pop_up_template();
	}

	//! Modes button
	else if (user_request.includes("open modes")) {
		match = true;
		reply = "Opening modes";

		show_pop_up_template("modes");
	}
	//
	else if (user_request.includes("hide modes")) {
		match = true;
		reply = "Closing modes";

		hide_pop_up_template();
	}

	//! History button
	else if (user_request.includes("open history")) {
		match = true;
		reply = "Opening history";

		show_pop_up_template("history");
	}
	//
	else if (user_request.includes("hide history")) {
		match = true;
		reply = "Closing history";

		hide_pop_up_template();
	}
	//
	else if (user_request.includes("clear history")) {
		match = true;
		reply = "Deleting all data saved in history";

		clear_actions_list();
	}

	return {
		match,
		reply,
	};
}
