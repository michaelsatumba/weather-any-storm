import Link from 'next/link';
import { useState, useEffect } from 'react';

function forecast() {
	const [city, setCity] = useState(null);
	const [weatherIcon, setWeatherIcon] = useState('10d');
	const [weatherIconTomorrow, setWeatherIconTomorrow] = useState('10d');
	const [weatherIconTomorrowTwo, setWeatherIconTomorrowTwo] = useState('10d');
	const [weatherIconTomorrowThree, setWeatherIconTomorrowThree] =
		useState('10d');
	const [weatherIconTomorrowFour, setWeatherIconTomorrowFour] = useState('10d');
	const [weatherIconTomorrowFive, setWeatherIconTomorrowFive] = useState('10d');
	const [weatherIconTomorrowSix, setWeatherIconTomorrowSix] = useState('10d');

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
	const [twoTomorrowTemp, setTwoTomorrowTemp] = useState(null);
	const [threeTomorrowTemp, setThreeTomorrowTemp] = useState(null);
	const [fourTomorrowTemp, setFourTomorrowTemp] = useState(null);
	const [fiveTomorrowTemp, setFiveTomorrowTemp] = useState(null);
	const [sixTomorrowTemp, setSixTomorrowTemp] = useState(null);

	const [tempMax, setTempMax] = useState(null);
	const [tomorrowTempMax, setTomorrowTempMax] = useState(null);
	const [twoTomorrowTempMax, setTwoTomorrowTempMax] = useState(null);
	const [threeTomorrowTempMax, setThreeTomorrowTempMax] = useState(null);
	const [fourTomorrowTempMax, setFourTomorrowTempMax] = useState(null);
	const [fiveTomorrowTempMax, setFiveTomorrowTempMax] = useState(null);
	const [sixTomorrowTempMax, setSixTomorrowTempMax] = useState(null);

	const [exercise, setExercise] = useState('');

	const iconSmallLink = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
	const iconSmallestLink = `http://openweathermap.org/img/wn/${weatherIconTomorrow}.png`;
	const iconSmallestLinkTomorrow = `http://openweathermap.org/img/wn/${weatherIconTomorrow}.png`;
	const iconSmallestLinkTwo = `http://openweathermap.org/img/wn/${weatherIconTomorrowTwo}.png`;
	const iconSmallestLinkThree = `http://openweathermap.org/img/wn/${weatherIconTomorrowThree}.png`;
	const iconSmallestLinkFour = `http://openweathermap.org/img/wn/${weatherIconTomorrowFour}.png`;
	const iconSmallestLinkFive = `http://openweathermap.org/img/wn/${weatherIconTomorrowFive}.png`;
	const iconSmallestLinkSix = `http://openweathermap.org/img/wn/${weatherIconTomorrowSix}.png`;

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
					setWeatherIconTomorrow(data.daily[1].weather[0].icon);
					setWeatherIconTomorrowTwo(data.daily[2].weather[0].icon);
					setWeatherIconTomorrowThree(data.daily[3].weather[0].icon);
					setWeatherIconTomorrowFour(data.daily[4].weather[0].icon);
					setWeatherIconTomorrowFive(data.daily[5].weather[0].icon);
					setWeatherIconTomorrowSix(data.daily[6].weather[0].icon);

					setTemp(Math.floor(data.daily[0].temp.min));
					setTomorrowTemp(Math.floor(data.daily[1].temp.min));
					setTwoTomorrowTemp(Math.floor(data.daily[2].temp.min));
					setThreeTomorrowTemp(Math.floor(data.daily[3].temp.min));
					setFourTomorrowTemp(Math.floor(data.daily[4].temp.min));
					setFiveTomorrowTemp(Math.floor(data.daily[5].temp.min));
					setSixTomorrowTemp(Math.floor(data.daily[6].temp.min));

					setTempMax(Math.floor(data.daily[0].temp.max));
					setTomorrowTempMax(Math.floor(data.daily[1].temp.max));
					setTwoTomorrowTempMax(Math.floor(data.daily[2].temp.max));
					setThreeTomorrowTempMax(Math.floor(data.daily[3].temp.max));
					setFourTomorrowTempMax(Math.floor(data.daily[4].temp.max));
					setFiveTomorrowTempMax(Math.floor(data.daily[5].temp.max));
					setSixTomorrowTempMax(Math.floor(data.daily[6].temp.max));

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
							<p>{temp}°&nbsp;&nbsp;&nbsp;</p>
							<p className="text-gray-700">{tempMax}°</p>
						</div>
						<img className=" h-7 w-7" src={iconSmallestLink}></img>
					</div>
					<div className="flex justify-evenly">
						<p className="text-gray-600">{tomorrow}</p>
						<div className="flex">
							<p>{tomorrowTemp}°&nbsp;&nbsp;&nbsp;</p>
							<p className="text-gray-700">{tomorrowTempMax}°</p>
						</div>
						<img className=" h-7 w-7" src={iconSmallestLinkTomorrow}></img>
					</div>
					<div className="flex justify-evenly">
						<p className="text-gray-600">{twoTomorrow}</p>
						<div className="flex">
							<p>{twoTomorrowTemp}°&nbsp;&nbsp;&nbsp;</p>
							<p className="text-gray-700">{twoTomorrowTempMax}°</p>
						</div>
						<img className=" h-7 w-7" src={iconSmallestLinkTwo}></img>
					</div>
					<div className="flex justify-evenly">
						<p className="text-gray-600">{threeTomorrow}</p>
						<div className="flex">
							<p>{threeTomorrowTemp}°&nbsp;&nbsp;&nbsp;</p>
							<p className="text-gray-700">{threeTomorrowTempMax}°</p>
						</div>
						<img className=" h-7 w-7" src={iconSmallestLinkThree}></img>
					</div>
					<div className="flex justify-evenly">
						<p className="text-gray-600">{fourTomorrow}</p>
						<div className="flex">
							<p>{fourTomorrowTemp}°&nbsp;&nbsp;&nbsp;</p>
							<p className="text-gray-700">{fourTomorrowTempMax}°</p>
						</div>
						<img className=" h-7 w-7" src={iconSmallestLinkFour}></img>
					</div>
					<div className="flex justify-evenly">
						<p className="text-gray-600">{fiveTomorrow}</p>
						<div className="flex">
							<p>{fiveTomorrowTemp}°&nbsp;&nbsp;&nbsp;</p>
							<p className="text-gray-700">{fiveTomorrowTempMax}°</p>
						</div>
						<img className=" h-7 w-7" src={iconSmallestLinkFive}></img>
					</div>
					<div className="flex justify-evenly">
						<p className="text-gray-600">{sixTomorrow}</p>
						<div className="flex">
							<p>{sixTomorrowTemp}°&nbsp;&nbsp;&nbsp;</p>
							<p className="text-gray-700">{sixTomorrowTempMax}°</p>
						</div>
						<img className=" h-7 w-7" src={iconSmallestLinkSix}></img>
					</div>
				</div>
			</div>
		</div>
	);
}

export default forecast;
