import { get_note_index } from "./get_note_index.js";
import { get_all_notes } from "./get_all_notes.js";

export function change_note_status(user_request, status) {
	let note_index = get_note_index(user_request);
	let note_id;

	fetch("./javascript/data.json").then((response) => {
		response.json().then((data) => {
			let server_url = data.server_url;
			let virtual_assistant_id = data.virtual_assistant_id;

			// Get the list of all notes from the Virtual Assistant's actions list
			fetch(`${server_url}`).then((response) => {
				response.json().then((data) => {
					let notes_list = data[0].notes;
					note_id = notes_list[note_index]._id;

					let note_object = {
						virtual_assistant_id: virtual_assistant_id,
						note_id: note_id,
						done: status,
					};

					// Update the done status of the note at note_id
					fetch(`${server_url}/notes`, {
						method: "PATCH",
						body: JSON.stringify(note_object),
						headers: { "Content-Type": "application/json" },
					}).then((response) => {
						// Check to see if there is any error
						if (response.status == 400) {
							response.json().then((data) => {
								alert(data.msg);
							});
						}
						//
						else {
							// Get all notes from the database and update the list on the web app
							get_all_notes();
						}
					});
				});
			});
		});
	});
}
