
## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

<!-- **Note: Delete this note and update the table of contents based on what sections you keep.** -->

## Overview

### The challenge

Users should be able to:

- Display weather.
- Display weather tomorrow.
- Display weather the next day after tomorrow.
- Search for city and display weather.
- Display 7 day forecast.
- Search for multiple cities.

### Screenshot

![](<./public/localhost_3000_(iPhone%2012%20Pro).png>)

<!-- Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it.

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above. -->

<!-- **Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.** -->

### Links

<!-- - Solution URL: [Add solution URL here](https://your-solution-url.com) -->

- Live Site URL: [Live Site](https://weather-any-storm.vercel.app/)

## My process

Basic HTML, logic, styling.

### Built with

- Next.js
- Tailwind

### What I learned

I learned how to use React Hooks such as useState and useEffect (again).
How to intereact with the weather API, getting the specific item from nested objects and arrays.

I have been building this weather app and I get the API response based on my coordinates. I have another page that shows a weekly forecast for the place. Instead of using the device's location to render out the weather. I have implemented a search bar where the user can search for a city. The city will give the coordinates, giving me the necessary components to make my weather API call. I had trouble pushing the state to the next page. But a friend of mine helped, she showed me the router property in next.js. It is relatively simple and very similar to passing props in react.

```Example
import Router from 'next/router';
const forecastPage = () => {
Router.push(
{
pathname: '/forecast',
query: { lat, lon, city },
},
'/forecast'
);
};

In the other page:
import { useRouter } from 'next/router';

function Forecast() {
const router = useRouter();

const {
query: { lat, lon, city },
} = router;

const props = {
lat,
lon,
city,
};

return (
<p className="font-bold">{props.city}</p>
)
```

<!-- Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge. -->

<!-- To see how you can add code snippets, see below: -->

```html
<div className="flex justify-around pt-16">
				<div className="flex space-x-2">
					<p>📍</p>
					<p>{city}</p>
					<button>🔽</button>
				</div>

				<button>🗓️</button>
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
```

```css
<div className="flex space-x-4 mt-10 px-4">
				<div>
					<p className="pb-5">Today</p>
					<div className="bg-teal-100 rounded-lg flex flex-col items-center">
						<p className="text-gray-500">{currentDate.getHours()}</p>
						<img className="" src={iconLink}></img>
						<p className="text-lg">{temp}°</p>
					</div>
				</div>
				<div>
					<p className="pb-5">Tomorrow</p>
					<div className="bg-teal-100 rounded-lg flex flex-col items-center">
						<p className="text-gray-500">{currentDate.getHours()}</p>
						<img className="" src={iconLinkTomorrow}></img>
						<p className="text-lg">{tomorrowTemp}°</p>
					</div>
				</div>
				<div>
					<p className="pb-5">Day After</p>
					<div className="bg-teal-100 rounded-lg flex flex-col items-center">
						<p className="text-gray-500">{currentDate.getHours()}</p>
						<img className="" src={iconLinkDayAfterTomorrow}></img>
						<p className="text-lg">{dayAfterTomorrowTemp}°</p>
					</div>
				</div>
			</div>
```

```js
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
				// console.log(currentDate);
				// console.log(data.daily[1].dt);
				setDemo(data.daily[1].dt);
				console.log(new Date(demo).toString());
				// console.log(demo.getHours());
				// console.log(demo.toString());

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
```

<!-- If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more. -->

<!-- **Note: Delete this note and the content within this section and replace with your own learnings.** -->

### Continued development

<!-- Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect. -->

Show time of current city.

<!-- **Note: Delete this note and the content within this section and replace with your own plans for continued development.** -->

### Useful resources

- [React](https://reactjs.org/docs/getting-started.html) - This helped me for understanding react hooks.
- [Dribble](https://dribbble.com/shots/14784828-Weather-forecast-interface) - Inspiration.
<!-- - [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.** -->

## Author

- Website - [Michael Satumba](https://mkeport.vercel.app/)
<!-- - Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername) -->

<!-- **Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.** -->

## Acknowledgments

<!-- This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit. -->

Thank you Dribbble for inspring me.

<!-- **Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.** -->
