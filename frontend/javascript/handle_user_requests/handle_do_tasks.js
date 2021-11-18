import { record_actions } from "../virtual_assistant_actions/record_actions.js";

let new_browser_tab;
let new_tab_name = "";

export function handle_do_tasks(user_request) {
	let match = false;
	let reply;

	if (user_request.includes("open")) {
		if (!user_request.includes("guide") && !user_request.includes("modes") && !user_request.includes("history")) {
			match = true;
			user_request = user_request.substring(5, user_request.length).toLowerCase();
			reply = "Opening" + user_request;

			new_browser_tab = window.open(`https://www.${user_request}.com`, "_blank");
			new_tab_name = user_request;

			record_actions("Open", user_request);
		}
	}
	//
	else if (user_request.includes("search")) {
		match = true;
		reply = "I found some answers for your question on the Internet.";

		user_request = user_request.substring(7, user_request.length);
		let query = user_request.replace(/ /g, "+");
		new_browser_tab = window.open(`https://www.google.com/search?q=${query}`, "_blank");
		new_tab_name = "Google";

		record_actions("Search", user_request);
	}
	//
	else if (user_request.includes("play")) {
		match = true;
		user_request = user_request.substring(5, user_request.length);
		reply = `Playing ${user_request} in Spotify. Due to your Internet connection, it might take a few seconds to load your song`;

		record_actions("Play", user_request);
	}
	//
	else if (user_request.includes("close tab")) {
		match = true;

		if (new_browser_tab !== "") {
			reply = "Closing" + new_tab_name;
			new_browser_tab.close();
			new_browser_tab = "";

			record_actions("Close tab", user_request);
		} else {
			reply = "I already closed all of the new tabs";
		}
	}
	//
	else if (user_request.includes("close window")) {
		match = true;
		reply = "Closing the browser. Have an amazing day!";

		record_actions("Close window", "");

		setTimeout(() => {
			window.close();
		}, 3000);
	}

	return {
		match,
		reply,
	};
}
