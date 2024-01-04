import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [longitude, setLongitude] = useState("-17.4441");
  const [latitude, setLatitude] = useState("14.6937");

  useEffect(() => {
    const apiKey = "24816bde0ae30482a33b1b59c2df2a94";

    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );

        setWeatherData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données météorologiques", error);
      }
    };

    fetchWeatherData();
  }, [latitude, longitude]);

  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };

  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };

  const getTemperatureTheme = () => {
    if (weatherData && weatherData.main.temp) {
      const temperature = weatherData.main.temp;

      if (temperature < 10) {
        return "cold-theme";
      } else if (temperature < 20) {
        return "moderate-theme";
      } else {
        return "warm-theme";
      }
    }

    return "moderate-theme";
  };

  return (
    <div className={`container ${getTemperatureTheme()}`}>
      <div className="header">
        <h1>My Weather App</h1>
        <img src="logo.png" alt="logo" />
      </div>

      <div className="left-container">
        <h2>Informations</h2>
        {weatherData && (
          <div className="weather-info">
            <p>
              <strong>City:</strong> {weatherData.name}
            </p>
            <p>
              <strong>Temperature:</strong> {weatherData.main.temp} °C
            </p>
            <p>
              <strong>Main:</strong> {weatherData.weather[0].main}
            </p>
            <p>
              <strong>Description:</strong> {weatherData.weather[0].description}
            </p>
            <img
              src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              alt="Weather icon"
            />

            <p>
              <strong>Sunrise:</strong>{" "}
              {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
            </p>
            <p>
              <strong>Sunset:</strong>{" "}
              {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
            </p>
          </div>
        )}
      </div>

      <div className="right-container">
        <div className="coordinates-container">
          <h2>Put Coordinates</h2>
          <div>
            <p>
              <strong>Longitude:</strong> {longitude}
            </p>
            <p>
              <strong>Latitude:</strong> {latitude}
            </p>
          </div>
          <div>
            <label>Longitude:</label>
            <input type="text" value={longitude} onChange={handleLongitudeChange} />
          </div>
          <div>
            <label>Latitude:</label>
            <input type="text" value={latitude} onChange={handleLatitudeChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
