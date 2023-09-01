import React from 'react';

function Hours({ hourlyData, currentHour }) {
  // Find the index of the first hour in the forecast data that is greater than the current hour
  const startIndex = hourlyData.findIndex(
    (hour) => parseInt(hour.time.split(' ')[1].slice(0, 2)) > currentHour
  );

  // Get the next 2-hour interval forecast
  const next2HourForecast = hourlyData.slice(startIndex, startIndex + 4);

  return (
    <div>
      <center>
        <h3>Hourly Forecast</h3>
        {next2HourForecast.map((hour, hourIndex) => (
          <div key={hourIndex}>
            <p>Time: {hour.time}</p>
            <p>Temperature: {hour.temp_c}°C</p>
            <p>Condition: {hour.condition.text}</p>
            <p>Rain Probability: {hour.chance_of_rain}%</p>
            <img src={hour.condition.icon} alt="Weather Icon" />

            {hourIndex !== next2HourForecast.length - 1 && <hr />}
          </div>
        ))}
      </center>
    </div>
  );
}

export default Hours;