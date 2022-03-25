import { useState, useEffect } from 'react';

export default function Home() {
	const [city, setCity] = useState(null);
	const [temp, setTemp] = useState(null);
	const [search, setSearch] = useState('San Francisco');
	// const findMe = () => {
	// 	const success = (position) => {
	// 		const latitude = position.coords.latitude;
	// 		const longitude = position.coords.longitude;
	// 		const geoURL =
	// 			'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en';

	// 		fetch(geoURL)
	// 			.then((res) => res.json())
	// 			.then((data) => {
	// 				setCity(data.city);
	// 			});
	// 	};

	// 	const error = (showError) => {
	// 		setCity('I will find you');
	// 		setPlace('Watch your back');
	// 	};

	// 	navigator.geolocation.getCurrentPosition(success, error);
	// };

	const weather = () => {
		const success = (position) => {
			// const lat = position.coords.latitude;
			// const lon = position.coords.longitude;
			const searchItem = search;
			const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchItem}&appid=a53e7014f41f2cd34a0e24f9dc2c5737&units=imperial`;

			fetch(weatherURL)
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					setCity(data.name);
					setTemp(Math.floor(data.main.temp));
				});
		};

		const error = (showError) => {};

		navigator.geolocation.getCurrentPosition(success, error);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setSearch('');
		weather();
	};

	useEffect(() => {
		weather();
	}, []);

	return (
		<div>
			<h1 className="text-3xl font-bold">the.weather</h1>
			<p>{temp}</p>
			<p>{city}</p>
			<p>Time</p>
			<p>Emoji</p>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					className="bg-black text-white"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</form>

			<button type="button" onClick={handleSubmit}>
				search
			</button>
		</div>
	);
}

/*
TO DO
1 Screen
1) Weather 
Weather API

*/
