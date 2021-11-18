export function use_modes_template() {
	let modes_data = [
		{
			image: "images/default.png",
			title: "Default",
		},
		{
			image: "images/girlfriend.png",
			title: "Girlfriend",
		},
		{
			image: "images/fun.png",
			title: "Fun",
		},
		{
			image: "images/serious.png",
			title: "Serious",
		},
	];

	let pop_up_main_content = document.querySelector(".pop_up_main_content");
	pop_up_main_content.innerHTML = "";

	// ! Left side
	let modes_wrapper = document.createElement("div");
	modes_wrapper.classList.add("modes_wrapper");

	let current_mode_wrapper = document.createElement("div");
	current_mode_wrapper.classList.add("current_mode_wrapper");

	let current_mode_image_wrapper = document.createElement("div");
	current_mode_image_wrapper.classList.add("current_mode_image_wrapper");

	let current_mode_image = document.createElement("img");
	current_mode_image.classList.add("current_mode_image");
	current_mode_image.src = "images/default.png";
	current_mode_image_wrapper.appendChild(current_mode_image);

	let current_mode_title = document.createElement("div");
	current_mode_title.classList.add("current_mode_title");
	current_mode_title.innerHTML = "Default";

	current_mode_wrapper.appendChild(current_mode_image_wrapper);
	current_mode_wrapper.appendChild(current_mode_title);

	modes_wrapper.appendChild(current_mode_wrapper);

	// ! Right side
	let all_modes_wrapper = document.createElement("div");
	all_modes_wrapper.classList.add("all_modes_wrapper");

	modes_data.forEach((mode_item) => {
		let single_mode_wrapper = document.createElement("div");
		single_mode_wrapper.classList.add("single_mode_wrapper");

		let singe_mode_image_wrapper = document.createElement("div");
		singe_mode_image_wrapper.classList.add("single_mode_image_wrapper");

		let single_mode_image = document.createElement("img");
		single_mode_image.classList.add("single_mode_image");
		single_mode_image.src = mode_item.image;

		singe_mode_image_wrapper.appendChild(single_mode_image);

		let single_mode_title = document.createElement("div");
		single_mode_title.classList.add("single_mode_title");
		single_mode_title.innerHTML = mode_item.title;

		single_mode_wrapper.appendChild(singe_mode_image_wrapper);
		single_mode_wrapper.appendChild(single_mode_title);

		all_modes_wrapper.appendChild(single_mode_wrapper);
	});

	modes_wrapper.appendChild(all_modes_wrapper);

	// ! Final
	pop_up_main_content.appendChild(modes_wrapper);
}
