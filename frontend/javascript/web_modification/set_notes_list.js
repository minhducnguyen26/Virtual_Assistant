export function set_notes_list(notes_list) {
	let notes_list_container = document.querySelector(".notes_list");
	let single_note = document.createElement("p");
	single_note.classList.add("single_note");

	// Remove all child nodes from notes_list_container
	while (notes_list_container.firstChild) {
		notes_list_container.removeChild(notes_list_container.firstChild);
	}

	let i = 1;
	// Then update the notes_list_container with the new notes_list
	notes_list.forEach((note) => {
		let note_description = note.description.charAt(0).toUpperCase() + note.description.slice(1);
		let note_done = note.done;

		single_note.innerHTML = i + ". " + note_description;

		if (note_done) {
			single_note.classList.add("note_done");
		}
		//
		else {
			single_note.classList.remove("note_done");
		}

		notes_list_container.appendChild(single_note.cloneNode(true));

		i++;
	});
}
