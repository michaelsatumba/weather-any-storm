import Link from 'next/link';
import { useState, useEffect } from 'react';

function Forecast() {
	const [city, setCity] = useState(null);
	const [weatherIcon, setWeatherIcon] = useState('10d');
	const [weatherIconTomorrow, setWeatherIconTomorrow] = useState(null);

	const [alerts, setAlerts] = useState('');
	const [minutes, setMinutes] = useState('');
	const [today, setToday] = useState('');
	const [tomorrow, setTomorrow] = useState('');
	const [twoTomorrow, setTwoTomorrow] = useState('');
	const [threeTomorrow, setThreeTomorrow] = useState('');
	const [fourTomorrow, setFourTomorrow] = useState('');
	const [fiveTomorrow, setFiveTomorrow] = useState('');
	const [sixTomorrow, setSixTomorrow] = useState('');

	const [temp, setTemp] = useState(null);
	const [tomorrowTemp, setTomorrowTemp] = useState(null);
	const [exercise, setExercise] = useState('');

	const iconSmallLink = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
	const iconSmallestLink = `http://openweathermap.org/img/wn/${weatherIcon}.png`;

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

					if (data.alerts == null) {
						console.log('no alerts');
					}

					const todayAlerts = new Date(data.alerts[0].start);
					const todayMinutes = todayAlerts.getMinutes();

					const days = [
						'Sunday',
						'Monday',
						'Tuesday',
						'Wednesday',
						'Thursday',
						'Friday',
						'Saturday',
					];

					const abDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

					// let date = new Date(dt * 1000);

					const todayTarget =
						abDays[new Date(data.daily[0].dt * 1000).getUTCDay()];

					const tomorrowTarget =
						abDays[new Date(data.daily[1].dt * 1000).getUTCDay()];

					const twoTomorrowTarget =
						abDays[new Date(data.daily[2].dt * 1000).getUTCDay()];

					const threeTomorrowTarget =
						abDays[new Date(data.daily[3].dt * 1000).getUTCDay()];

					const fourTomorrowTarget =
						abDays[new Date(data.daily[4].dt * 1000).getUTCDay()];

					const fiveTomorrowTarget =
						abDays[new Date(data.daily[5].dt * 1000).getUTCDay()];

					const sixTomorrowTarget =
						abDays[new Date(data.daily[6].dt * 1000).getUTCDay()];

					setWeatherIcon(data.current.weather[0].icon);
					setTemp(Math.floor(data.current.temp));
					setTomorrowTemp(Math.floor(data.hourly[23].temp));
					setWeatherIconTomorrow(data.hourly[23].weather[0].icon);

					setAlerts(data.alerts[0].description);
					setMinutes(todayMinutes);
					setToday(todayTarget);
					setTomorrow(tomorrowTarget);
					setTwoTomorrow(twoTomorrowTarget);
					setThreeTomorrow(threeTomorrowTarget);
					setFourTomorrow(fourTomorrowTarget);
					setFiveTomorrow(fiveTomorrowTarget);
					setSixTomorrow(sixTomorrowTarget);
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
		<div className="h-screen bg-orange-400 text-white">
			<div className="flex space-x-32 pt-16">
				<Link href="/">
					<div className="px-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M10 19l-7-7m0 0l7-7m-7 7h18"
							/>
						</svg>
					</div>
				</Link>
				<p className="font-bold">{city}</p>
			</div>
			<div className="flex flex-col rounded-lg bg-gray-300 text-black my-10 mx-10 h-28 ">
				<div className="flex justify-end">
					<img className="w-10" src={iconSmallLink}></img>
				</div>
				<p>{minutes} minutes ago</p>
				<p className="text-xs truncate">{alerts}</p>
			</div>
			<div className="mb-10 px-4">
				<p className="font-bold">This week</p>
			</div>
			<div>
				<div className="px-4 flex flex-col space-y-10">
					<div className="flex justify-evenly">
						<p className="text-gray-600">{today}</p>
						<div className="flex">
							<p>28°&nbsp;&nbsp;&nbsp;</p>
							<p className="text-gray-700">21°</p>
						</div>
						<img className=" h-7 w-7" src={iconSmallestLink}></img>
					</div>
					<div className="flex justify-evenly">
						<p className="text-gray-600">{tomorrow}</p>
						<div className="flex">
							<p>28°&nbsp;&nbsp;&nbsp;</p>
							<p className="text-gray-700">21°</p>
						</div>
						<img className=" h-7 w-7" src={iconSmallestLink}></img>
					</div>
					<div className="flex justify-evenly">
						<p className="text-gray-600">{twoTomorrow}</p>
						<div className="flex">
							<p>28°&nbsp;&nbsp;&nbsp;</p>
							<p className="text-gray-700">21°</p>
						</div>
						<img className=" h-7 w-7" src={iconSmallestLink}></img>
					</div>
					<div className="flex justify-evenly">
						<p className="text-gray-600">{threeTomorrow}</p>
						<div className="flex">
							<p>28°&nbsp;&nbsp;&nbsp;</p>
							<p className="text-gray-700">21°</p>
						</div>
						<img className=" h-7 w-7" src={iconSmallestLink}></img>
					</div>
					<div className="flex justify-evenly">
						<p className="text-gray-600">{fourTomorrow}</p>
						<div className="flex">
							<p>28°&nbsp;&nbsp;&nbsp;</p>
							<p className="text-gray-700">21°</p>
						</div>
						<img className=" h-7 w-7" src={iconSmallestLink}></img>
					</div>
					<div className="flex justify-evenly">
						<p className="text-gray-600">{fiveTomorrow}</p>
						<div className="flex">
							<p>28°&nbsp;&nbsp;&nbsp;</p>
							<p className="text-gray-700">21°</p>
						</div>
						<img className=" h-7 w-7" src={iconSmallestLink}></img>
					</div>
					<div className="flex justify-evenly">
						<p className="text-gray-600">{sixTomorrow}</p>
						<div className="flex">
							<p>28°&nbsp;&nbsp;&nbsp;</p>
							<p className="text-gray-700">21°</p>
						</div>
						<img className=" h-7 w-7" src={iconSmallestLink}></img>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Forecast;
