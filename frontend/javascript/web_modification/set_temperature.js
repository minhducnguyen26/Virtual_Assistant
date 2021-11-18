export function set_temperature() {
	fetch("./javascript/data.json").then((response) => {
		response.json().then((data) => {
			let OpenWeather_api_key = data.OpenWeather_api_key;

			let api_address = "https://api.openweathermap.org/data/2.5/weather?q=";
			let city_name = "Saint George";
			let degree_in_F = "&units=imperial";
			let api_key = `&appid=${OpenWeather_api_key}`;

			fetch(api_address + city_name + degree_in_F + api_key)
				.then((response) => response.json())
				.then((data) => {
					let temperature = Math.round(data.main.temp).toString();
					let temperature_info = document.querySelector(".temperature_info");
					temperature_info.innerHTML = temperature + "&deg;";

					let weather_description = data.weather[0].description;
					let weather_info = document.querySelector(".weather_info");
					weather_info.innerHTML = weather_description.toLocaleUpperCase();
				});
		});
	});
}
