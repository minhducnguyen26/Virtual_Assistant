//! This file is in charge of designing the schemas of the data saved in the database

const mongoose = require("mongoose");

const user_schema = mongoose.Schema({
	virtual_assistant_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Virtual_Assistant",
	},
	user_name: String,
	user_dob: String,
});

const note_schema = mongoose.Schema({
	virtual_assistant_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Virtual_Assistant",
	},
	description: String,
	done: Boolean,
});

const action_schema = mongoose.Schema({
	virtual_assistant_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Virtual_Assistant",
	},
	action_type: String,
	user_request: String,
	data: String,
	time: String,
});

const virtual_assistant_schema = mongoose.Schema({
	name: String,
	mode: String,
	speech_rate: String,
	speech_pitch: String,
	user_infos: [user_schema],
	notes: [note_schema],
	actions: [action_schema],
});

const Virtual_Assistant = mongoose.model("Virtual_Assistant", virtual_assistant_schema);

module.exports = { Virtual_Assistant };
