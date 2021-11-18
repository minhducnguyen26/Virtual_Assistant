export function clear_actions_list() {
	// Get the server url from data.json
	fetch("./javascript/data.json").then((response) => {
		response.json().then((data) => {
			let server_url = data.server_url;
			let virtual_assistant_id = data.virtual_assistant_id;

			// Prepare the action object to be saved
			let action_object = {
				virtual_assistant_id: virtual_assistant_id,
			};

			// Using the PUT method to change the "actions" list to empty array
			fetch(`${server_url}/actions`, {
				method: "PUT",
				body: JSON.stringify(action_object),
				headers: { "Content-Type": "application/json" },
			}).then((response) => {
				// Check to see if there is any error
				if (response.status == 400) {
					response.json().then((data) => {
						alert(data.msg);
					});
				}
			});
		});
	});
}
