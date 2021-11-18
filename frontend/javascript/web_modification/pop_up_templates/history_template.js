export function use_history_template() {
	fetch("./javascript/data.json").then((response) => {
		response.json().then((data) => {
			let server_url = data.server_url;

			// Get the last recorded action from the Virtual Assistant's actions list
			fetch(`${server_url}`).then((response) => {
				response.json().then((data) => {
					console.log(data[0].actions);

					let pop_up_main_content = document.querySelector(".pop_up_main_content");
					pop_up_main_content.innerHTML = "";
				});
			});
		});
	});
}
