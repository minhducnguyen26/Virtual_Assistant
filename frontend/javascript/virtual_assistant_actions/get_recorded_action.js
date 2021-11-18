import { record_actions } from "../virtual_assistant_actions/record_actions.js";
import { simple_talk_to_user } from "../virtual_assistant_actions/talk_to_user.js";

export function get_recorded_action(action_type) {
	let last_recorded_action;
	let answer_for_user;

	fetch("./javascript/data.json").then((response) => {
		response.json().then((data) => {
			let server_url = data.server_url;

			// Get the last recorded action from the Virtual Assistant's actions list
			fetch(`${server_url}`).then((response) => {
				response.json().then((data) => {
					last_recorded_action = data[0].actions.at(-1);
					answer_for_user = last_recorded_action.data;

					if (action_type === "Read") {
						simple_talk_to_user(answer_for_user);
					}
					//
					else if (action_type === "Show") {
						console.log(answer_for_user);
					}
					//
					else if (action_type === "Email") {
						record_actions("Email", answer_for_user);
					}
				});
			});
		});
	});

	return last_recorded_action;
}
