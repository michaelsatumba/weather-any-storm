import React from 'react';
import { useState, useEffect } from 'react';

function forecast() {
	const [demo, setDemo] = useState('');
	const weather = () => {
		const success = (position) => {
			const lat = position.coords.latitude;
			const lon = position.coords.longitude;
			const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude{}&appid=bf63e57f6ca8565522bf2301f33f5d33&units=imperial`;

			const geoURL =
				'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en';

			// fetch(geoURL)
			// 	.then((res) => res.json())
			// 	.then((data) => {
			// 		setCity(data.city);
			// 	});

			fetch(weatherURL)
				.then((res) => res.json())
				.then((data) => {
					console.log(data);

					// const tomorrow = new Date(data.daily[2].dt);
					// const tomorrowDate = tomorrow.getUTCDay();
					// const days = [
					// 	'Sunday',
					// 	'Monday',
					// 	'Tuesday',
					// 	'Wednesday',
					// 	'Thursday',
					// 	'Friday',
					// 	'Saturday',
					// ];
					// const tomorrowDay = days[tomorrowDate];
					setDemo(data.current.temp);
					// setWeatherIcon(data.current.weather[0].icon);
					// setTemp(Math.floor(data.current.temp));
					// setDescription(data.current.weather[0].main);
					// setWindSpeed(Math.floor(data.current.wind_speed));
					// setRainPercentage(data.hourly[0].pop);
					// setTomorrowTemp(Math.floor(data.hourly[23].temp));
					// setDayAfterTomorrowTemp(Math.floor(data.hourly[47].temp));
					// setWeatherIconTomorrow(data.hourly[23].weather[0].icon);
					// setDayAfterTomorrowTemp(Math.floor(data.hourly[47].temp));
					// setWeatherIconDayAfterTomorrow(data.hourly[47].weather[0].icon);
				});
		};

		const error = (showError) => {
			setCity('I will find you');
			setWeatherIcon('I will find you');
			setTemp('I will find you');
			setDescription('I will find you');
			setWindSpeed('I will find you');
			setRainPercentage('I will find you');
		};

		navigator.geolocation.getCurrentPosition(success, error);
	};

	useEffect(() => {
		weather();
	}, []);

	return <div>{demo}</div>;
}

export default forecast;
