// EightDayForecastPage.js
import React from "react";
import "./App.css";

const EightDayForecastPage = ({ eightDayData }) => {
  const formatDate = (timestamp) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    return new Date(timestamp * 1000).toLocaleDateString("en-US", options);
  };

  return (
    <div className="eight-day-forecast-page">
      <h2>8-Day Forecast</h2>
      <div className="forecast-grid">
        {eightDayData.map((day, index) => (
          <div key={index} className="forecast-item">
            <p>{formatDate(day.dt)}</p>
            <img
              src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
              alt="Weather icon"
            />
            <p>{day.main.temp} °C</p>
            <p>{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EightDayForecastPage;
