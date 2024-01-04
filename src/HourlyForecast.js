import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

function HourlyForecast({ latitude, longitude }) {
  const [hourlyForecast, setHourlyForecast] = useState(null);

  useEffect(() => {
    const apiKey = "24816bde0ae30482a33b1b59c2df2a94";

    const fetchHourlyForecast = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,daily&appid=${apiKey}&units=metric`
        );

        setHourlyForecast(response.data.hourly);
      } catch (error) {
        console.error("Erreur lors de la récupération des prévisions horaires", error);
      }
    };

    fetchHourlyForecast();
  }, [latitude, longitude]);

  return (
    <div className="hourly-forecast">
      <h2>Hourly Forecast</h2>
      {hourlyForecast && hourlyForecast.length > 0 ? (
        <Line
          data={{
            labels: hourlyForecast.map((hour) =>
              new Date(hour.dt * 1000).toLocaleTimeString()
            ),
            datasets: [
              {
                label: "Temperature (°C)",
                data: hourlyForecast.map((hour) => hour.temp),
                fill: false,
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: "rgba(75,192,192,1)",
                pointBorderColor: "rgba(75,192,192,1)",
                pointHoverRadius: 6,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
              },
            ],
          }}
          options={{
            scales: {
              x: {
                type: "linear",
                position: "bottom",
              },
            },
          }}
        />
      ) : (
        <p>Loading hourly forecast...</p>
      )}
    </div>
  );
}

export default HourlyForecast;
