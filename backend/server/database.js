//! This file is in charge of all database connections

const mongoose = require("mongoose");
const db = mongoose.connection;

function connect(start_server) {
	let connection_path = "mongodb+srv://minh-nguyen-2601:minh-nguyen-2601@cluster0.db836.mongodb.net/virtual_assistant?retryWrites=true&w=majority";
	mongoose
		.connect(connection_path, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.catch(function (error) {
			console.log("There was an error connecting to the database: ", error);
		});

	console.log("Connected to the database");

	db.once("open", start_server);
}

module.exports = { connect };
