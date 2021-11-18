export function set_date_and_time() {
	let today = new Date();
	let month_list = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	//! Month and Date Circle
	let month = document.querySelector(".month");
	month.innerHTML = month_list[today.getMonth()].toUpperCase();

	let date = document.querySelector(".date");
	date.innerHTML = today.getDate();

	//! Clock Box
	let hours = today.getHours().toString() + ":";
	if (today.getHours() < 10) {
		hours = "0" + hours;
	}
	let minutes = today.getMinutes().toString() + ":";
	if (today.getMinutes() < 10) {
		minutes = "0" + minutes;
	}
	let seconds = today.getSeconds().toString();
	if (today.getSeconds() < 10) {
		seconds = "0" + seconds;
	}

	let clock = document.querySelector(".time");
	clock.innerHTML = hours + minutes + seconds;
}
