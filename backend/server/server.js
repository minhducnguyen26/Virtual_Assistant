//! This file is in chare of running the server

const app = require("./app");
const database = require("./database");

// Define a port
const port = process.argv[2] || process.env.PORT || 8080;

// Start the app server
function start_server() {
	app.listen(port, () => {
		console.log("Server is running on port: " + port);
		console.log("");
	});
}

// Connect to the mongo database
database.connect(
	// Once the app connects to the database,
	// start the app server
	start_server
);
