import { find_reply } from "./find_reply.js";

//! Answer the user with an appropriate reply
export function talk_to_user(user_request) {
	let speech = new SpeechSynthesisUtterance();

	speech.text = find_reply(user_request);
	speech.volume = 1;
	speech.rate = 1.2;
	speech.pitch = 1;

	// Add the local website to "chrome://settings/content/sound" for speechSynthesis.speak to work
	speechSynthesis.speak(speech);
}

export function simple_talk_to_user(last_recorded_action) {
	let speech = new SpeechSynthesisUtterance();

	speech.text = last_recorded_action;
	speech.volume = 1;
	speech.rate = 1.3;
	speech.pitch = 1;

	speechSynthesis.speak(speech);
}
