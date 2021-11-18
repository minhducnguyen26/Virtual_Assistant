export function get_note_index(user_request) {
	let note_position = user_request.substring(7, user_request.length);
	let note_index;

	if (note_position == "one" || note_position == "1") {
		note_index = 0;
	}
	//
	else if (note_position == "two" || note_position == "2") {
		note_index = 1;
	}
	//
	else if (note_position == "three" || note_position == "3") {
		note_index = 2;
	}
	//
	else if (note_position == "four" || note_position == "4" || note_position == "for") {
		note_index = 3;
	}
	//
	else if (note_position == "five" || note_position == "5") {
		note_index = 4;
	}
	//
	else if (note_position == "six" || note_position == "6") {
		note_index = 5;
	}
	//
	else if (note_position == "seven" || note_position == "7") {
		note_index = 6;
	}
	//
	else if (note_position == "eight" || note_position == "8") {
		note_index = 7;
	}
	//
	else if (note_position == "nine" || note_position == "9") {
		note_index = 8;
	}
	//
	else if (note_position == "ten" || note_position == "10") {
		note_index = 9;
	}

	return note_index;
}
