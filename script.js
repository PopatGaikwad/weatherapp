const api_key = "b2cdf54b2c1cf2312370098beb121e71";
const api_url = "https://api.openweathermap.org/data/2.5/weather";

const cityInput = document.getElementById("city-input");
const searchbtn = document.getElementById("search-btn");
const weathercard = document.getElementById("weather-card");
const citynameElem = document.getElementById("city-name");
const temperatureElem = document.getElementById("temperature");
const descriptionElem = document.getElementById("description");
const humidityElem = document.getElementById("humidity");
const windElem = document.getElementById("wind");
const weatherIconElem = document.getElementById("weather-icon");
const errorMsg = document.getElementById("error-msg");

const sampleData = {
  name: "London",
  weather: [
    {
      main: "Clouds",
      description: "Broken clouds",
      icon: "04d",
    },
  ],
  main: {
    temp: 16.5,
    humidity: 72,
  },
  wind: {
    speed: 4.2,
  },
};

const fetchWeather = async (city) => {
  try {
    const res = await fetch(
      `${api_url}?q=${encodeURIComponent(city)}&appid=${api_key}&units=metric`
    );

    if (!res.ok) throw new Error("City not found");

    const data = await res.json();
    console.log("✅ API Response:", data);
    displayWeather(data);
  } catch (err) {
    console.error("❌ Error:", err);
    errorMsg.style.display = "block";
    errorMsg.textContent = "City not found ❌";
    weathercard.style.display = "none";
  }
};

const displayWeather = (data) => {
  citynameElem.textContent = data.name;
  temperatureElem.textContent = `${Math.round(data.main.temp)}°C`;
  descriptionElem.textContent = data.weather[0].description;
  humidityElem.textContent = `💧 Humidity: ${data.main.humidity}%`;
  windElem.textContent = `🌬 Wind Speed: ${data.wind.speed} m/s`;

  const iconCode = data.weather[0].icon;
  weatherIconElem.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${data.weather[0].description}">`;

  weathercard.style.display = "block";
  errorMsg.style.display = "none";
};

searchbtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && cityInput.value.trim()) {
    fetchWeather(cityInput.value.trim());
  }
});

window.addEventListener("DOMContentLoaded", () => {
  displayWeather(sampleData);
});
