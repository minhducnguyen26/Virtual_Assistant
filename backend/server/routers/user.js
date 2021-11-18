const express = require("express");
const router = express.Router();

const model = require("../model");
const Virtual_Assistant = model.Virtual_Assistant;

const middleware = require("./middleware");

//! POST - Create a new user to a specific virtual assistant
router.post("/", (req, res) => {
	res.setHeader("Content-Type", "application/json");

	console.log("");
	console.log("Creating a new user");

	let new_user = {
		virtual_assistant_id: req.body.virtual_assistant_id,
		user_name: req.body.user_name,
		user_dob: req.body.user_dob,
	};

	Virtual_Assistant.findByIdAndUpdate(
		req.body.virtual_assistant_id,
		// add new_user to user_infos of a specific virtual assistant at its id
		{
			$push: { user_infos: new_user },
		},
		// get the latest updated version of the virtual assistant
		// the new_user is now added to user_infos
		{
			new: true,
		},
		(error, virtual_assistant) => {
			// Check if there is any error
			if (error) {
				console.log("Unable to add a new user.");
				console.log(error);

				res.status(500).json({
					message: "Unable to add a new user",
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
			// Success! Return the new_user after creating it
			res.status(201).json(virtual_assistant.user_infos);
		}
	);
});

router.use(middleware);

module.exports = router;
