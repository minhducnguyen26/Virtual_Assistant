const model = require("../server/model");
const Virtual_Assistant = model.Virtual_Assistant;

function save_answers(answer, virtual_assistant_id, action_id) {
	Virtual_Assistant.updateOne(
		{ "actions._id": action_id },
		{
			$set: {
				"actions.$.data": answer,
			},
		},
		(error, virtual_assistant) => {
			// Check if there is any error
			if (error) {
				console.log(`Unable to update the action with id: ${action_id}`);
				console.log(error);
				return;
			}
			// check if the virtual assistant actually exists
			else if (virtual_assistant === null) {
				console.log("Unable to find the virtual assistant with id:", virtual_assistant_id);
				console.log(error);
				return;
			}
		}
	);
}

module.exports = save_answers;
