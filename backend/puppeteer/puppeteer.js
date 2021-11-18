const puppeteer = require("puppeteer");
const play_music = require("./play_music");
const search_answers = require("./search_answers");

const chromeOptions = {
	// Defines the executable path for Chrome
	headless: true,
	slowMo: 10,
	defaultViewport: null,
	timeout: 0,
	ignoreDefaultArgs: ["--mute-audio"],
	args: ["--autoplay-policy=no-user-gesture-required"],
};

async function main(action_type, user_request, virtual_assistant_id, action_id) {
	try {
		const browser = await puppeteer.launch(chromeOptions);
		const page = await browser.newPage();

		if (action_type === "Play") {
			music_is_playing = play_music(user_request, page);
		}
		//
		else if (action_type === "Questions") {
			let done = await search_answers(page, user_request, virtual_assistant_id, action_id);

			if (done) {
				await browser.close();
			}
		}
	} catch (error) {
		console.log(error);
	}
}

module.exports = main;
