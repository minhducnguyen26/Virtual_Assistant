import { handle_small_talks } from "../handle_user_requests/handle_small_talks.js";
import { handle_do_tasks } from "../handle_user_requests/handle_do_tasks.js";
import { handle_questions } from "../handle_user_requests/handle_questions.js";
import { handle_emotions } from "../handle_user_requests/handle_emotions.js";
import { handle_do_notes_list } from "../handle_user_requests/handle_do_notes_list.js";
import { handle_actions_data } from "../handle_user_requests/handle_actions_data.js";
import { handle_page_buttons } from "../handle_user_requests/handle_page_buttons.js";
import { handle_calculations } from "../handle_user_requests/handle_calculations.js";

import { show_command_suggestions } from "../web_modification/command_suggestions.js";
import { hide_command_suggestions } from "../web_modification/command_suggestions.js";

//! Find the correct reply based on the user's request
export function find_reply(user_request) {
	let small_talks = handle_small_talks(user_request);
	let do_tasks = handle_do_tasks(user_request);
	let questions = handle_questions(user_request);
	let emotions = handle_emotions(user_request);
	let do_notes_list = handle_do_notes_list(user_request);
	let actions_data = handle_actions_data(user_request);
	let page_buttons = handle_page_buttons(user_request);
	let calculations = handle_calculations(user_request);

	let reply;

	//* If the user wants to have small Talks
	if (small_talks.match) {
		reply = small_talks.reply;
		hide_command_suggestions();
	}

	//* If the user wants the virtual assistant to do tasks
	else if (do_tasks.match) {
		reply = do_tasks.reply;
		hide_command_suggestions();
	}

	//* If the user asks questions
	else if (questions.match) {
		reply = questions.reply;

		setTimeout(() => {
			show_command_suggestions("Read it to me", "Let me read it", "Send it to my email");
		}, 4000);
	}

	//* If the user share his emotions
	else if (emotions.match) {
		reply = emotions.reply;
		hide_command_suggestions();
	}

	//* If the user wants to add/update/delete a note from the notes list
	else if (do_notes_list.match) {
		reply = do_notes_list.reply;
		hide_command_suggestions();
	}

	//* If the user wants to hear/read/or have the data sent to his email
	else if (actions_data.match) {
		reply = actions_data.reply;
	}

	//* If the user wants to interact with the web app by clicking buttons
	else if (page_buttons.match) {
		reply = page_buttons.reply;
		hide_command_suggestions();
	}

	//* If the user wants to calculate something
	else if (calculations.match) {
		reply = calculations.reply;
		hide_command_suggestions();
	}

	//* If the user's request does not match any reply
	else {
		reply = "Sorry I don't understand, please try again.";
	}

	return reply;
}
