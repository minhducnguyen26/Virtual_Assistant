import { use_guide_template } from "./guide_template.js";
import { use_modes_template } from "./modes_template.js";
import { use_history_template } from "./history_template.js";

let pop_up_wrapper = document.querySelector(".pop_up_wrapper");
let title_and_close_button = document.querySelector(".title_and_close_button");
let pop_up_main_content = document.querySelector(".pop_up_main_content");

export function show_pop_up_template(pop_up_type) {
	pop_up_wrapper.classList.remove("hide_pop_up_wrapper");
	pop_up_wrapper.style.display = "block";

	pop_up_main_content.classList.remove("hide_pop_up_main_content");
	title_and_close_button.classList.remove("hide_title_and_close_button");

	let pop_up_title = document.querySelector(".pop_up_title");
	pop_up_title.innerHTML = pop_up_type.toUpperCase();

	if (pop_up_type === "guide") {
		use_guide_template();
	}
	//
	else if (pop_up_type === "modes") {
		use_modes_template();
	}
	//
	else if (pop_up_type === "history") {
		use_history_template();
	}
}

export function hide_pop_up_template() {
	pop_up_wrapper.classList.add("hide_pop_up_wrapper");
	title_and_close_button.classList.add("hide_title_and_close_button");
	pop_up_main_content.classList.add("hide_pop_up_main_content");

	setTimeout(() => {
		pop_up_wrapper.style.display = "none";
	}, 500);
}
