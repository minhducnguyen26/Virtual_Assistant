import { get_all_notes } from "./get_all_notes.js";

export function add_note_to_server(user_request) {
	// Get the server url from data.json
	fetch("./javascript/data.json").then((response) => {
		response.json().then((data) => {
			let virtual_assistant_id = data.virtual_assistant_id;

			// Prepare the note object to be saved
			let note_object = {
				virtual_assistant_id: virtual_assistant_id,
				description: user_request,
				done: false,
			};

			let server_url = data.server_url;

			// Send the note_object to the server to be saved in the database
			fetch(`${server_url}/notes`, {
				method: "POST",
				body: JSON.stringify(note_object),
				headers: { "Content-Type": "application/json" },
			}).then((response) => {
				// Check to see if there is any error
				if (response.status == 400) {
					response.json().then((data) => {
						alert(data.msg);
					});
				} else {
					// Get all notes from the database and update the list on the web app
					get_all_notes();
				}
			});
		});
	});
}
