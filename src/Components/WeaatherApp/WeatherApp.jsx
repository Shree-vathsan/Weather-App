import React, { useState } from "react";
import "./WeatherApp.css";
import searchIcon from "../Assets/search.png";
import clearIcon from "../Assets/clear.png";
import cloudIcon from "../Assets/cloud.png";
import drizzleIcon from "../Assets/drizzle.png";
import rainIcon from "../Assets/rain.png";
import snowIcon from "../Assets/snow.png";
import windIcon from "../Assets/wind.png";
import humidityIcon from "../Assets/humidity.png";

const WeatherApp = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [unit, setUnit] = useState("Metric");
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherDetails, setWeatherDetails] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "a23a51ff6762e85151145fe752b703fe"; // Replace with your OpenWeatherMap API key
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "Metric" ? "Imperial" : "Metric"));
    if (weatherDetails) {
      fetchWeather(weatherDetails.location, unit === "Metric" ? "Imperial" : "Metric");
    }
  };

  const fetchWeather = async (location, unit = "Metric") => {
    try {
      const response = await fetch(
        `${API_URL}?q=${location}&units=${unit.toLowerCase()}&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      setWeatherDetails({
        temperature: data.main.temp,
        location: data.name,
        description: data.weather[0].description,
        high: data.main.temp_max,
        low: data.main.temp_min,
        humidity: `${data.main.humidity}%`,
        windSpeed: `${(data.wind.speed * 3.6).toFixed(2)} km/h`, // Convert m/s to km/h
        icon: getWeatherIcon(data.weather[0].main), // Get icon based on weather
      });
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return clearIcon;
      case "clouds":
        return cloudIcon;
      case "drizzle":
        return drizzleIcon;
      case "rain":
        return rainIcon;
      case "snow":
        return snowIcon;
      default:
        return cloudIcon; // Default icon
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    fetchWeather(searchQuery, unit);
    setSearchQuery("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      <div className="top-bar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <img
            src={searchIcon}
            alt="Search"
            className="search-icon"
            onClick={handleSearch}
          />
        </div>
        <button onClick={toggleUnit}>
          {unit === "Metric" ? "°F" : "°C"}
        </button>
        <button onClick={toggleDarkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {weatherDetails ? (
        <div className="weather-card">
          <div className="weather-header">
            <div className="location">{weatherDetails.location}</div>
            <div className="icon bounce-animation">
              <img src={weatherDetails.icon} alt="weather icon" />
            </div>
            <div className="temperature">
              {weatherDetails.temperature}°{unit === "Metric" ? "C" : "F"}
            </div>
          </div>

          <div className="weather-details">
            <div className="description">{weatherDetails.description}</div>
            <div className="high-low">
              <div>High: {Math.round(weatherDetails.high)}°</div>
              <div>Low: {Math.round(weatherDetails.low)}°</div>
            </div>
            <div className="humidity-wind">
              <div className="info">
                <img src={humidityIcon} alt="humidity" /> {weatherDetails.humidity}
              </div>
              <div className="info">
                <img src={windIcon} alt="wind" /> {weatherDetails.windSpeed}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="placeholder">Search for a city to see the weather details</div>
      )}
    </div>
  );
};

export default WeatherApp;
