export function handle_calculations(user_request) {
	let match = false;
	let reply;

	let equation_as_string = user_request.substring(8, user_request.length);
	let actual_equation = equation_as_string.replace(/[^-()\d/*+.]/g, "");

	let result = eval(actual_equation);

	if (user_request.includes("+")) {
		match = true;

		equation_as_string += "equals ";
	}
	//
	else if (user_request.includes("-")) {
		match = true;

		equation_as_string = equation_as_string.replace("-", "minus ");
		equation_as_string += "equals ";
	}
	//
	else if (user_request.includes("*")) {
		match = true;

		equation_as_string = equation_as_string.replace("*", "times ");
		equation_as_string += "equals ";
	}
	//
	else if (user_request.includes("/")) {
		match = true;
		result = result.toFixed(2);

		equation_as_string = equation_as_string.replace("/", "divided by ");
		equation_as_string += "equals ";
	}
	//
	else if (user_request.includes("square root")) {
		match = true;

		let number_as_string = user_request.substring(27, user_request.length);
		let actual_number = parseInt(number_as_string);

		result = Math.sqrt(actual_number).toFixed(2);

		equation_as_string += "is ";
	}

	reply = equation_as_string + result;

	return {
		match,
		reply,
	};
}
