const express = require("express");
const router = express.Router();

//! Middleware - Log the app status after each method is called
router.use((req, res, next) => {
	console.log("");
	console.log("===============================================================================================");

	// Date and Time format
	let date = new Date().toLocaleDateString("en-US") + " at ";
	let hours = new Date().getHours().toString() + ":";
	let minutes = new Date().getMinutes().toString() + ":";
	let seconds = new Date().getSeconds().toString();
	console.log("Time  :", date + hours + minutes + seconds);

	console.log("Method:", req.method);
	res.on("finish", () => {
		console.log("Status Code:", res.statusCode);
	});
	console.log("Path  :", req.originalUrl);
	console.log("Body  :", req.body);
	next();
});

module.exports = router;
