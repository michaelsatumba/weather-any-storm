import Link from 'next/link';
import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function forecast() {
	const [city, setCity] = useState(null);
	const [weatherIcon, setWeatherIcon] = useState(null);
	const [weatherIconTomorrow, setWeatherIconTomorrow] = useState(null);
	const [weatherIconDayAfterTomorrow, setWeatherIconDayAfterTomorrow] =
		useState(null);
	const [temp, setTemp] = useState(null);
	const [description, setDescription] = useState(null);
	const [windSpeed, setWindSpeed] = useState(null);
	const [rainPercentage, setRainPercentage] = useState(null);
	const [tomorrowTemp, setTomorrowTemp] = useState(null);
	const [dayAfterTomorrowTemp, setDayAfterTomorrowTemp] = useState(null);
	const [exercise, setExercise] = useState('');
	const [demo, setDemo] = useState('');
	const [search, setSearch] = useState('');

	const currentDate = new Date();
	const minute = 1000 * 60;
	const hour = minute * 60;
	const day = hour * 24;

	const iconLink = `http://openweathermap.org/img/wn/${weatherIcon}@4x.png`;
	const iconLinkTomorrow = `http://openweathermap.org/img/wn/${weatherIconTomorrow}@4x.png`;
	const iconLinkDayAfterTomorrow = `http://openweathermap.org/img/wn/${weatherIconDayAfterTomorrow}@4x.png`;
	const iconSmall = `http://openweathermap.org/img/wn/${weatherIconDayAfterTomorrow}.png`;

	const weather = () => {
		const success = (position) => {
			const lat = position.coords.latitude;
			const lon = position.coords.longitude;
			const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude{}&appid=bf63e57f6ca8565522bf2301f33f5d33&units=imperial`;

			const geoURL =
				'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en';

			fetch(geoURL)
				.then((res) => res.json())
				.then((data) => {
					setCity(data.city);
				});

			fetch(weatherURL)
				.then((res) => res.json())
				.then((data) => {
					console.log(data);

					const tomorrow = new Date(data.daily[2].dt);
					// console.log(tomorrow);
					const tomorrowDate = tomorrow.getUTCDay();
					// console.log(tomorrowDate);
					const days = [
						'Sunday',
						'Monday',
						'Tuesday',
						'Wednesday',
						'Thursday',
						'Friday',
						'Saturday',
					];
					const tomorrowDay = days[tomorrowDate];
					// console.log(tomorrowDay);

					setWeatherIcon(data.current.weather[0].icon);
					setTemp(Math.floor(data.current.temp));
					setDescription(data.current.weather[0].main);
					setWindSpeed(Math.floor(data.current.wind_speed));
					setRainPercentage(data.hourly[0].pop);
					setTomorrowTemp(Math.floor(data.hourly[23].temp));
					setDayAfterTomorrowTemp(Math.floor(data.hourly[47].temp));
					setWeatherIconTomorrow(data.hourly[23].weather[0].icon);
					setDayAfterTomorrowTemp(Math.floor(data.hourly[47].temp));
					setWeatherIconDayAfterTomorrow(data.hourly[47].weather[0].icon);

					if (rainPercentage === 0) {
						setExercise('Go take a walk');
					} else {
						setExercise('Stay inside and do some pushups');
					}
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

	return (
		<div>
			<div className="flex space-x-32">
				<Link href="/">
					<p>back</p>
				</Link>
				<p>{city}</p>
			</div>
			<div>
				<div className="flex justify-end">
					<img className="" src={iconLink}></img>
				</div>
				<p>15 minutes ago</p>
				<p>Alert</p>
			</div>
			<div>
				<p>This week</p>
			</div>
			<div>
				<div>
					<p>Sunday</p>
					<p>Highest Temp</p>
					<p>Lowest Temp</p>
					<img className="" src={iconSmall}></img>
				</div>
			</div>
		</div>
	);
}

export default forecast;
