const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const cityNameElem = document.getElementById("city-name");
const temperatureElem = document.getElementById("temperature");
const conditionElem = document.getElementById("condition");
const forecastContainer = document.getElementById("forecast-cards");

// Fetch current weather
async function getCurrentWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();

  if (response.ok) {
    cityNameElem.textContent = `${data.name}, ${data.sys.country}`;
    temperatureElem.textContent = `Temperature: ${data.main.temp}°C`;
    conditionElem.textContent = `Condition: ${data.weather[0].description}`;
  } else {
    alert("City not found!");
  }
}

// Fetch 5-day forecast
async function getForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();

  if (response.ok) {
    const dailyForecast = data.list.filter(forecast => forecast.dt_txt.includes("12:00:00"));

    forecastContainer.innerHTML = "";
    dailyForecast.forEach(day => {
      const date = new Date(day.dt_txt).toLocaleDateString("en-IN", { weekday: "short" });
      const temp = day.main.temp.toFixed(1);
      const icon = day.weather[0].icon;
      const desc = day.weather[0].description;

      const forecastCard = document.createElement("div");
      forecastCard.classList.add("forecast-day");
      forecastCard.innerHTML = `
        <p>${date}</p>
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}">
        <p>${temp}°C</p>
        <p>${desc}</p>
      `;
      forecastContainer.appendChild(forecastCard);
    });
  }
}

// Search button click event
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city !== "") {
    getCurrentWeather(city);
    getForecast(city);
  }
});
