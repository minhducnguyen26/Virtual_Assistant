import { set_notes_list } from "../../web_modification/set_notes_list.js";

export function get_all_notes() {
	let notes_list = [];

	fetch("./javascript/data.json").then((response) => {
		response.json().then((data) => {
			let server_url = data.server_url;

			// Get the list of all notes from the Virtual Assistant's actions list
			fetch(`${server_url}`).then((response) => {
				response.json().then((data) => {
					notes_list = data[0].notes;
					set_notes_list(notes_list);
				});
			});
		});
	});
}
