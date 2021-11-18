export function use_guide_template() {
	let guide_data = [
		{
			title: 'Everything starts with a simple "Hey"',
			description: 'Try "Hey, open Gmail"',
		},
		{
			title: "Work with Notes",
			description: [
				'"Create note" followed by the message to add a new note',
				'"Finish note number" followed by the number of the saved note to cross it out',
				'"Reuse note number" followed by the number of the saved note to reuse it',
				'"Delete note number" followed by the number of the saved note to delete it',
			],
		},
		{
			title: "Work with Buttons",
			description: ['"Open" followed by the button name to open it', '"Hide" followed by the button name to close it'],
		},
	];

	let pop_up_main_content = document.querySelector(".pop_up_main_content");
	pop_up_main_content.innerHTML = "";

	let single_guide_wrapper = document.createElement("div");
	single_guide_wrapper.classList.add("single_guide_wrapper");

	let i = 1;

	guide_data.forEach((guide_item) => {
		let guide_title = document.createElement("div");
		guide_title.classList.add("single_guide_title");
		guide_title.innerHTML = i + ". " + guide_item.title;

		let guide_description = document.createElement("div");
		guide_description.classList.add("single_guide_description");

		if (guide_item.description instanceof Array) {
			guide_item.description.forEach((description) => {
				let single_description = document.createElement("div");
				single_description.classList.add("single_description");
				single_description.innerHTML = "- " + description;

				guide_description.appendChild(single_description);
			});
		}
		//
		else {
			guide_description.innerHTML = guide_item.description;
		}

		single_guide_wrapper.appendChild(guide_title);
		single_guide_wrapper.appendChild(guide_description);

		i++;
	});

	pop_up_main_content.appendChild(single_guide_wrapper);
}
