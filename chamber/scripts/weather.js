const apiKey = 'your_openweather_api_key';
const city = 'Nigeria';
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const weatherDisplay = document.getElementById('weather-display');
    const currentTemp = Math.round(data.list[0].main.temp);
    const weatherDescription = data.list[0].weather.map(w => capitalizeWords(w.description)).join(', ');
    const forecast = getThreeDayForecast(data.list);

    weatherDisplay.innerHTML = `
      <p>Current Temp: ${currentTemp}°C</p>
      <p>Conditions: ${weatherDescription}</p>
      <p>3-day Forecast: ${forecast}</p>
    `;
  })
  .catch(error => console.error('Error fetching weather:', error));

function capitalizeWords(description) {
  return description.replace(/\b\w/g, char => char.toUpperCase());
}

function getThreeDayForecast(list) {
  let forecast = '';
  for (let i = 1; i <= 3; i++) {
    forecast += `Day ${i}: ${Math.round(list[i].main.temp)}°C `;
  }
  return forecast;
}
