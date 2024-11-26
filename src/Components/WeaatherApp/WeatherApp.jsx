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
  const [weatherDetails, setWeatherDetails] = useState({
    temperature: 20, // in Celsius
    location: "London",
    description: "Haze",
    high: 22,
    low: 18,
    humidity: "60%",
    windSpeed: "15 km/h",
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "Metric" ? "Imperial" : "Metric"));
    setWeatherDetails((prevDetails) => {
      const newTemp =
        unit === "Metric"
          ? (prevDetails.temperature * 9) / 5 + 32 // Celsius to Fahrenheit
          : ((prevDetails.temperature - 32) * 5) / 9; // Fahrenheit to Celsius
      return {
        ...prevDetails,
        temperature: Math.round(newTemp * 10) / 10, // Rounded value
        high:
          unit === "Metric"
            ? (prevDetails.high * 9) / 5 + 32
            : ((prevDetails.high - 32) * 5) / 9,
        low:
          unit === "Metric"
            ? (prevDetails.low * 9) / 5 + 32
            : ((prevDetails.low - 32) * 5) / 9,
      };
    });
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return; // Ignore empty searches
    console.log(`Searching for weather details in: ${searchQuery}`);
    // Simulate API call and update weather details
    setWeatherDetails({
      ...weatherDetails,
      location: searchQuery,
      temperature: Math.floor(Math.random() * 35) + 5, // Randomized for demo
    });
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
      <div className="weather-card">
        <div className="weather-header">
          <div className="location">{weatherDetails.location}</div>
          <div className="icon">
            <img src={cloudIcon} alt="weather icon" />
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
    </div>
  );
};

export default WeatherApp;
