const express = require("express");
const router = express.Router();

const model = require("../model");
const Virtual_Assistant = model.Virtual_Assistant;

const puppeteer = require("../../puppeteer/puppeteer");

const middleware = require("./middleware");

const nodemailer = require("../../nodemailer/nodemailer");

//! POST - Create a new action to a specific virtual assistant
router.post("/", (req, res) => {
	res.setHeader("Content-Type", "application/json");

	console.log("");
	console.log("Creating a new action");

	// Date and Time format
	let date = new Date().toLocaleDateString("en-US") + " at ";
	let hours = new Date().getHours().toString() + ":";
	let minutes = new Date().getMinutes().toString() + ":";
	let seconds = new Date().getSeconds().toString();
	let time = date + hours + minutes + seconds;

	let new_action = {
		virtual_assistant_id: req.body.virtual_assistant_id,
		action_type: req.body.action_type,
		user_request: req.body.user_request,
		data: req.body.data,
		time: time,
	};

	Virtual_Assistant.findByIdAndUpdate(
		req.body.virtual_assistant_id,
		// add new_action to the actions list of a specific virtual assistant at its id
		{
			$push: { actions: new_action },
		},
		// get the latest updated version of the virtual assistant,
		// the new_action is now added to the actions list
		{
			new: true,
		},
		(error, virtual_assistant) => {
			// Check if there is any error
			if (error) {
				console.log("Unable to add a new action.");
				console.log(error);

				res.status(500).json({
					message: "Unable to add a new action",
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
			// Success! Return the new_action after creating it
			res.status(201).json(virtual_assistant.actions[virtual_assistant.actions.length - 1]);

			let action_type = req.body.action_type;
			if (action_type === "Play" || action_type === "Questions") {
				let user_request = req.body.user_request;
				let virtual_assistant_id = req.body.virtual_assistant_id;
				let action_id = virtual_assistant.actions[virtual_assistant.actions.length - 1]._id;
				puppeteer(action_type, user_request, virtual_assistant_id, action_id);
			}
			//
			else if (action_type == "Email") {
				let last_recorded_action = virtual_assistant.actions[virtual_assistant.actions.length - 1];
				let content_to_be_sent = last_recorded_action.user_request;

				nodemailer.prepare_email_to_send(content_to_be_sent);
			}
		}
	);
});

//! PATCH - Update a specific action inside the actions list of the virtual assistant
router.patch("/", (req, res) => {
	res.setHeader("Content-Type", "application/json");

	console.log(`Update the action with id: ${req.body.action_id} in the virtual assistant with id: ${req.body.virtual_assistant_id}.`);

	Virtual_Assistant.updateOne(
		{ "actions._id": req.body.action_id },
		{
			$set: {
				"actions.$.data": req.body.data,
			},
		},
		(error, virtual_assistant) => {
			// Check if there is any error
			if (error) {
				console.log(`Unable to update the action with id: ${req.body.action_id}`);
				console.log(error);

				res.status(500).json({
					message: `Unable to update the action with id: ${req.body.action_id}`,
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

//! PUT - Reset the actions list - Clear history
router.put("/", (req, res) => {
	res.setHeader("Content-Type", "application/json");

	console.log("Delete the action list of the virtual assistant with id: ", req.body.virtual_assistant_id);
	console.log("");

	Virtual_Assistant.findByIdAndUpdate(
		req.body.virtual_assistant_id,
		{
			actions: [],
		},
		(error, virtual_assistant) => {
			// Check if there was an error
			if (error) {
				console.log(`Unable to delete the action list of the virtual assistant with id: ${req.body.virtual_assistant_id}`);
				console.log(error);

				res.status(500).json({
					message: `Unable to delete the action list of the virtual assistant with id: ${req.body.virtual_assistant_id}`,
					error: error,
				});
				return;
			}
			// check if the virtual assistant actually exists
			else if (virtual_assistant === null) {
				console.log(`Unable to find the virtual assistant with id: ${req.body.virtual_assistant_id}`);
				console.log(error);

				res.status(404).json({
					message: `Unable to find the virtual assistant with id: ${req.body.virtual_assistant_id}`,
					error: error,
				});
				return;
			}
			// Success! Return virtual assistant before the changes
			res.status(200).json(virtual_assistant);
		}
	);
});

router.use(middleware);

module.exports = router;
