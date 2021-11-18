import { talk_to_user } from "./virtual_assistant_actions/talk_to_user.js";
import { set_date_and_time } from "./web_modification/set_date_and_time.js";
import { set_temperature } from "./web_modification/set_temperature.js";
import { get_all_notes } from "./virtual_assistant_actions/handle_notes_list/get_all_notes.js";

//! Start Virtual Assistant
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
// Always listen to the user
recognition.continuous = true;
recognition.start();

//! After listening to each request from the user
recognition.onresult = function (event) {
	let result_index = event.resultIndex;

	//* Get the transcript of the user's request
	let transcript = event.results[result_index][0].transcript;

	//* The result at every index except 0 have a " " at the beginning of the string
	//* Make sure to remove that extra character
	if (result_index !== 0) {
		transcript = transcript.substring(1, transcript.length);
	}

	//* Only activate Virtual Assistant if the user said "Hey"
	if (transcript.toLowerCase().includes("hey")) {
		let user_request = transcript.substring(4, transcript.length);
		talk_to_user(user_request);
	}
};

//! Reset the recognition every 30s to make sure it always run
function reset_recognition() {
	recognition.stop();
}
setInterval(reset_recognition, 30000);

//! Restart recognition as soon as the recognition ends
recognition.onend = function (event) {
	recognition.start();
};

//! Set the current date and time
setInterval(() => {
	set_date_and_time();
}, 1000);

//! Set the current temperate
set_temperature();

//! Get all notes from the database and display them
get_all_notes();
