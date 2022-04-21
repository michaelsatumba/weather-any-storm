import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
	const [city, setCity] = useState(null);
	const [weatherIcon, setWeatherIcon] = useState('10d');
	const [weatherIconTomorrow, setWeatherIconTomorrow] = useState('10d');
	const [weatherIconDayAfterTomorrow, setWeatherIconDayAfterTomorrow] =
		useState('10d');
	const [temp, setTemp] = useState(null);
	const [description, setDescription] = useState(null);
	const [windSpeed, setWindSpeed] = useState(null);
	const [rainPercentage, setRainPercentage] = useState(null);
	const [tomorrowTemp, setTomorrowTemp] = useState(null);
	const [dayAfterTomorrowTemp, setDayAfterTomorrowTemp] = useState(null);
	const [exercise, setExercise] = useState('');
	const [demo, setDemo] = useState('');
	const [search, setSearch] = useState('');
	const [open, setOpen] = useState('hidden');

	// const [lat, setLat] = useState(position.coords.latitude);
	// const [lon, setLon] = useState(position.coords.longitude);

	const currentDate = new Date();

	const iconLink = `http://openweathermap.org/img/wn/${weatherIcon}@4x.png`;
	const iconLinkTomorrow = `http://openweathermap.org/img/wn/${weatherIconTomorrow}@4x.png`;
	const iconLinkDayAfterTomorrow = `http://openweathermap.org/img/wn/${weatherIconDayAfterTomorrow}@4x.png`;

	const apiKey = 'bf63e57f6ca8565522bf2301f33f5d33';
	const searchApiKey = 'a53e7014f41f2cd34a0e24f9dc2c5737';

	const weather = () => {
		const success = (position) => {
			// setLat(position.coords.latitude);
			// setLon(position.coords.longitude);
			const lat = position.coords.latitude;
			const lon = position.coords.longitude;
			const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude{}&appid=${apiKey}&units=imperial`;

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

					let dt = data.daily[7].dt;

					let date = new Date(dt * 1000);
					const days = [
						'Sunday',
						'Monday',
						'Tuesday',
						'Wednesday',
						'Thursday',
						'Friday',
						'Saturday',
					];
					let today = days[date.getDay()];
					// alert(date);
					// alert(date.getUTCDay());
					// alert(today);

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

					if (rainPercentage < 20) {
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

	const openSearch = () => {
		if (open == 'hidden') {
			setOpen(null);
		} else {
			setOpen('hidden');
		}
	};

	const searchCity = () => {
		const query = search;
		const searchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${searchApiKey}&units=imperial`;

		fetch(searchUrl)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				console.log(data.coord.lon);
				console.log(data.coord.lat);
				setLat(data.coord.lat);
				setLon(data.coord.lon);
			});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setSearch('');
		setOpen('hidden');
		console.log(search);
		searchCity();
	};

	useEffect(() => {
		weather();
	}, []);

	return (
		<div className="h-screen bg-teal-300">
			<div className="flex justify-around pt-16">
				<div className="flex space-x-2">
					<p>📍</p>
					<p>{city}</p>
					<button onClick={openSearch}>🔽</button>
				</div>

				<Link href="/forecast">
					<button>🗓️</button>
				</Link>
			</div>

			<div className={`flex px-16 pt-2 space-x-2 ${open}`}>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						className="bg-white text-black"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</form>

				<button type="button" onClick={handleSubmit}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</button>
			</div>

			<div className="flex justify-center">
				<img className="" src={iconLink}></img>
			</div>

			<div className="flex flex-col items-center space-y-4">
				<p className="text-xl">{description}</p>
				<p className="text-7xl">{temp}°</p>
				<div className="flex space-x-4">
					<p className="text-xl">🌬️&nbsp;&nbsp;&nbsp;{windSpeed} mph</p>
					<p className="text-xl">
						💧&nbsp;&nbsp;&nbsp;{Math.floor(rainPercentage * 100)}%
					</p>
				</div>
			</div>

			<div className="flex space-x-4 mt-10 px-4">
				<div>
					<p className="pb-5">Today</p>
					<div className="bg-teal-100 rounded-lg flex flex-col items-center">
						<p className="text-gray-500">{currentDate.getHours()}00</p>
						<img className="" src={iconLink}></img>
						<p className="text-lg">{temp}°</p>
					</div>
				</div>
				<div>
					<p className="pb-5">Tomorrow</p>
					<div className="bg-teal-100 rounded-lg flex flex-col items-center">
						<p className="text-gray-500">{currentDate.getHours()}00</p>
						<img className="" src={iconLinkTomorrow}></img>
						<p className="text-lg">{tomorrowTemp}°</p>
					</div>
				</div>
				<div>
					<p className="pb-5">Day After</p>
					<div className="bg-teal-100 rounded-lg flex flex-col items-center">
						<p className="text-gray-500">{currentDate.getHours()}00</p>
						<img className="" src={iconLinkDayAfterTomorrow}></img>
						<p className="text-lg">{dayAfterTomorrowTemp}°</p>
					</div>
				</div>
			</div>

			<div className="flex justify-center pt-4">
				<p>{exercise}</p>
			</div>
		</div>
	);
}

// TO DO
// Search for a city
// City to coordinates
