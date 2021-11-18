const express = require("express");
const router = express.Router();

const model = require("../model");
const Virtual_Assistant = model.Virtual_Assistant;

const middleware = require("./middleware");

//! POST - Create a new note to a specific virtual assistant
router.post("/", (req, res) => {
	res.setHeader("Content-Type", "application/json");

	console.log("");
	console.log("Creating a new note");

	let new_note = {
		virtual_assistant_id: req.body.virtual_assistant_id,
		description: req.body.description,
		done: false,
	};

	Virtual_Assistant.findByIdAndUpdate(
		req.body.virtual_assistant_id,
		// add new_note to the notes list of a specific virtual assistant at its id
		{
			$push: { notes: new_note },
		},
		// get the latest updated version of the virtual assistant,
		// the new_note is now added to the notes list
		{
			new: true,
		},
		(error, virtual_assistant) => {
			// Check if there is any error
			if (error) {
				console.log("Unable to create a new note.");
				console.log(error);

				res.status(500).json({
					message: "Unable to create a new note",
					error: error,
				});
				return;
			}
			// check if the virtual assistant actually exists
			else if (virtual_assistant === null) {
				console.log("Unable to find the virtual assistant with id:", req.body.virtual_assistant_id);

				res.status(404).json({
					message: "Unable to find the virtual assistant",
					error: error,
				});
			}
			// Success! Return the new_note after creating it
			res.status(201).json(virtual_assistant.notes[virtual_assistant.notes.length - 1]);
		}
	);
});

//! PATCH - Update 'done' status of a specific note
router.patch("/", (req, res) => {
	res.setHeader("Content-Type", "application/json");

	console.log(`Update the note with id: ${req.body.note_id} in the virtual assistant with id: ${req.body.virtual_assistant_id}.`);

	Virtual_Assistant.updateOne(
		{ "notes._id": req.body.note_id },
		{
			$set: {
				"notes.$.done": req.body.done,
			},
		},
		(error, virtual_assistant) => {
			// Check if there is any error
			if (error) {
				console.log(`Unable to update the note with id: ${req.body.note_id}`);
				console.log(error);

				res.status(500).json({
					message: `Unable to update the note with id: ${req.body.note_id}`,
					error: error,
				});
				return;
			}
			// check if the virtual assistant actually exists
			else if (virtual_assistant === null) {
				console.log("Unable to find the virtual assistant with id:", req.body.virtual_assistant_id);

				res.status(404).json({
					message: "Unable to find the virtual assistant",
					error: error,
				});
			}
			// Success!
			res.status(201).json(virtual_assistant);
		}
	);
});

//! DELETE - Delete a note from a specific virtual assistant
router.delete("/:virtual_assistant_id/:note_id", (req, res) => {
	res.setHeader("Content-Type", "application/json");

	console.log(`Delete the note with id: ${req.params.note_id} of the virtual assistant with id: ${req.params.virtual_assistant_id}.`);

	Virtual_Assistant.findByIdAndUpdate(
		req.params.virtual_assistant_id, // (*)
		// take one note with a specific id (#) out of the list of notes
		// from a virtual assistant at its specific id (*)
		{
			$pull: {
				notes: {
					_id: req.params.note_id, // (#)
				},
			},
		},
		function (error, virtual_assistant) {
			// check if there was an error
			if (error) {
				console.log(`There was an error deleting a note with id ${req.params.note_id}`);
				console.log(error);

				// sending back the error
				res.status(500).json({
					message: `Unable to delete a note with id: ${req.params.note_id}`,
					error: error,
				});
				return;
			}
			// check if the virtual assistant actually exists
			else if (virtual_assistant === null) {
				console.log(`There was an error finding a virtual assistant with id ${req.params.virtual_assistant_id}`);
				console.log(error);

				// sending back the error
				res.status(404).json({
					message: `Unable to find a virtual assistant with id: ${req.params.virtual_assistant_id}`,
					error: error,
				});
				return;
			}
			// If there is no error and the virtual_assistant exists
			let targeted_note;
			virtual_assistant.notes.forEach((note) => {
				if (note._id == req.params.note_id) {
					targeted_note = note;
				}
			});
			// check if the post actually exists
			if (targeted_note == undefined) {
				console.log(`There was an error finding a note with id ${req.params.note_id}`);
				console.log(error);

				// sending back the error
				res.status(404).json({
					message: `Unable to find a note with id: ${req.params.note_id}`,
					error: error,
				});
				return;
			}
			// success! return the post that was deleted
			res.status(200).json(targeted_note);
		}
	);
});

router.use(middleware);

module.exports = router;
