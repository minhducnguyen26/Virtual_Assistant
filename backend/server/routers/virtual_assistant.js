const express = require("express");
const router = express.Router();

const model = require("../model");
const Virtual_Assistant = model.Virtual_Assistant;

const middleware = require("./middleware");

//! GET - Get the virtual assistant's infos
router.get("/", (req, res) => {
	res.setHeader("Content-Type", "application/json");

	console.log("Getting the virtual assistant's infos from the database.");
	console.log("");

	Virtual_Assistant.find({}, (error, virtual_assistant) => {
		// Check if there is any error
		if (error) {
			console.log("There was an error getting the virtual_assistant's infos:");
			console.log(error);

			res.status(500).json({
				message: "Unable to get the virtual_assistant's infos",
				error: error,
			});
			return;
		}
		// Success! Return the virtual assistant's infos
		res.status(200).json(virtual_assistant);
	});
});

//! POST - Create one virtual assistant
router.post("/", (req, res) => {
	res.setHeader("Content-Type", "application/json");

	console.log("Creating new virtual assistant with body:", req.body);
	console.log("");

	let new_virtual_assistant = {
		name: req.body.name,
		mode: req.body.mode,
		speech_rate: req.body.speech_rate,
		speech_pitch: req.body.speech_pitch,
	};

	Virtual_Assistant.create(new_virtual_assistant, (error, new_virtual_assistant) => {
		// Check if there is any error
		if (error) {
			console.log("Unable to create a new virtual assistant.");
			console.log(error);

			res.status(500).json({
				message: "Unable to create a new virtual assistant.",
				error: error,
			});
			return;
		}
		// Success! Return the new virtual assistant after creating it
		res.status(201).json(new_virtual_assistant);
	});
});

//! DELETE - Delete one virtual assistant by id
router.delete("/:id", (req, res) => {
	res.setHeader("Content-Type", "application/json");

	console.log("Deleting virtual assistant with id: ", req.params.id);
	console.log("");

	Virtual_Assistant.findByIdAndDelete(req.params.id, (error, virtual_assistant) => {
		// Check if there was an error
		if (error) {
			console.log(`Unable to delete the virtual assistant with id: ${req.params.id}`);
			console.log(error);

			res.status(500).json({
				message: `Unable to delete the virtual assistant with id: ${req.params.id}`,
				error: error,
			});
			return;
		}
		// check if the virtual assistant actually exists
		else if (virtual_assistant === null) {
			console.log(`Unable to find the virtual assistant with id: ${req.params.id}`);
			console.log(error);

			res.status(404).json({
				message: `Unable to find the virtual assistant with id: ${req.params.id}`,
				error: error,
			});
			return;
		}
		// Success! Return virtual assistant that was deleted
		res.status(200).json(virtual_assistant);
	});
});

router.use(middleware);

module.exports = router;
