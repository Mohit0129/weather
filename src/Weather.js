import React from 'react';

const Weather = ({ weather }) => {
  return (
    <center>
      <h3>Weather in {weather.location.name}</h3>
      <p>{weather.location.region}, {weather.location.country}</p>
      <p>Localtime: {weather.location.localtime}</p>
      <h1>{weather.current.temp_c}°C</h1>
      <p>Due to humidity it Feels like: {weather.current.feelslike_c}°C</p>
      <p>Condition: {weather.current.condition.text}</p>
      <img src={weather.current.condition.icon} alt="Weather Icon" />
      <p>Humidity: {weather.current.humidity}%</p>
      <p>Cloud: {weather.current.cloud}%</p>
      <p>Visibility: {weather.current.vis_km}KM</p>
      <p>Gust: {weather.current.gust_mph}MPH</p>
      <p>UV: {weather.current.uv}</p>
      <p>Wind Speed: {weather.current.wind_mph} MPH</p>
      <p>Wind Direction: {weather.current.wind_dir}</p>
      <p>Air presser: {weather.current.pressure_mb} MB</p>
      <p>Air Quality Index: {weather.current.air_quality['us-epa-index']}</p>
      <p>Air Quality: {getAirQuality(weather.current.air_quality['us-epa-index'])}</p>
    </center>
  );
};

const getAirQuality = (aqi) => {
  // Air Quality Index description
  switch (aqi) {
    case 1:
      return <h4>Good</h4>;
    case 2:
      return <h4>Moderate</h4>;
    case 3:
      return <h4>Unhealthy for Sensitive Groups</h4>;
    case 4:
      return <h4>Unhealthy</h4>;
    case 5:
      return <h4>Very Unhealthy</h4>;
    case 6:
      return <h4>Hazardous</h4>;
    default:
      return <h4>Unknown</h4>;
  }
};

export default Weather;
