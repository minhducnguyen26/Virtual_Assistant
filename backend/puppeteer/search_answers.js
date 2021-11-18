const mongoose = require("mongoose");
const db = mongoose.connection;
const connection_path = "mongodb+srv://minh-nguyen-2601:minh-nguyen-2601@cluster0.db836.mongodb.net/virtual_assistant?retryWrites=true&w=majority";

const save_answers = require("./save_answers");

async function search_answers(page, user_request, virtual_assistant_id, action_id) {
	// Search answers for the use's questions
	let query = user_request.toLowerCase().replace(/ /g, "+");
	await page.goto(`https://www.answers.com/search?q=${query}`);

	await page.waitForSelector("#highlightText > p");
	let answer = await page.evaluate(() => {
		let best_answer = document.querySelector("#highlightText > p").innerText;
		return best_answer;
	});

	// Connect to database and save the answer inside the actions object
	// of at a specific virtual assistant at its specific action based on the id
	mongoose
		.connect(connection_path, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			save_answers(answer, virtual_assistant_id, action_id);
		})
		.catch(function (error) {
			console.log("There was an error connecting to the database: ", error);
		});

	return true;
}

module.exports = search_answers;
