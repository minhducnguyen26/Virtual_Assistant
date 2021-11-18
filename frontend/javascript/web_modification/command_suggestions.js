let command_suggestions_instruction = document.querySelector(".command_suggestions_instruction");

let option_checkbox_1 = document.querySelector(".option_checkbox_1");
let option_checkbox_2 = document.querySelector(".option_checkbox_2");
let option_checkbox_3 = document.querySelector(".option_checkbox_3");

let option_detail_1 = document.querySelector(".option_detail_1");
let option_detail_2 = document.querySelector(".option_detail_2");
let option_detail_3 = document.querySelector(".option_detail_3");

let main_green_color = window.getComputedStyle(document.documentElement).getPropertyValue("--green");

export function show_command_suggestions(option_1, option_2, option_3) {
	command_suggestions_instruction.style.display = "flex";

	option_checkbox_1.style.display = "block";
	option_checkbox_2.style.display = "block";
	option_checkbox_3.style.display = "block";

	option_detail_1.innerHTML = option_1;
	option_detail_2.innerHTML = option_2;
	option_detail_3.innerHTML = option_3;
}

export function hide_command_suggestions() {
	command_suggestions_instruction.style.display = "none";

	option_checkbox_1.style.display = "none";
	option_checkbox_2.style.display = "none";
	option_checkbox_3.style.display = "none";

	option_checkbox_1.style.backgroundColor = "black";
	option_checkbox_2.style.backgroundColor = "black";
	option_checkbox_3.style.backgroundColor = "black";

	option_detail_1.innerHTML = "";
	option_detail_2.innerHTML = "";
	option_detail_3.innerHTML = "";
}

export function update_command_suggestions(option_checkbox_position) {
	if (option_checkbox_position === 1) {
		option_checkbox_1.style.backgroundColor = main_green_color;
		option_checkbox_2.style.backgroundColor = "black";
		option_checkbox_3.style.backgroundColor = "black";
	}
	//
	else if (option_checkbox_position === 2) {
		option_checkbox_2.style.backgroundColor = main_green_color;
		option_checkbox_1.style.backgroundColor = "black";
		option_checkbox_3.style.backgroundColor = "black";
	}
	//
	else if (option_checkbox_position === 3) {
		option_checkbox_3.style.backgroundColor = main_green_color;
		option_checkbox_1.style.backgroundColor = "black";
		option_checkbox_2.style.backgroundColor = "black";
	}
}
