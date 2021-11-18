async function play_music(user_request, page) {
	// Search for the song that matches the user's request
	let query = user_request.toLowerCase().replace(/\s/g, "%20");
	await page.goto(`https://tainhac123.com/tim-kiem/${query}`);

	// Wait for the song to be loaded, then click it
	await page.waitForSelector("#main > article > div > div:nth-child(2) > div.detail-info > h3 > a");
	await page.click("#main > article > div > div:nth-child(2) > div.detail-info > h3 > a");

	// Wait for the audio tag of the song is loaded, then click it
	await page.waitForSelector("#main > article > div > div.bh-audio > audio");
	page.$eval("audio", (audio) => {
		audio.play();
	});

	return true;
}

module.exports = play_music;
