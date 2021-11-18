import { add_note_to_server } from "../virtual_assistant_actions/handle_notes_list/add_note_to_server.js";
import { change_note_status } from "../virtual_assistant_actions/handle_notes_list/change_note_status.js";
import { delete_note_from_server } from "../virtual_assistant_actions/handle_notes_list/delete_note_from_server.js";

export function handle_do_notes_list(user_request) {
	let match = false;
	let reply;

	if (user_request.includes("create note")) {
		match = true;
		reply = "Adding a new note to your list";

		user_request = user_request.substring(12, user_request.length);

		add_note_to_server(user_request);
	}
	//
	else if (user_request.includes("finish note")) {
		match = true;

		if (user_request.charAt(12) === " ") {
			user_request = user_request.substring(13, user_request.length);
		}
		//
		else {
			user_request = user_request.substring(12, user_request.length);
		}

		reply = "Note " + user_request + " has been crossed out";

		change_note_status(user_request, true);
	}
	//
	else if (user_request.includes("reuse note")) {
		match = true;

		if (user_request.charAt(11) === " ") {
			user_request = user_request.substring(12, user_request.length);
		}
		//
		else {
			user_request = user_request.substring(11, user_request.length);
		}

		reply = "Note " + user_request + " is set back to incomplete";

		change_note_status(user_request, false);
	}
	//
	else if (user_request.includes("delete note")) {
		match = true;

		if (user_request.charAt(12) === " ") {
			user_request = user_request.substring(13, user_request.length);
		}
		//
		else {
			user_request = user_request.substring(12, user_request.length);
		}

		reply = "Deleting note " + user_request;

		delete_note_from_server(user_request);
	}

	return {
		match,
		reply,
	};
}
