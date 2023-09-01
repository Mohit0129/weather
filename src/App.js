import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./index.css";
import Forecast from "./Forecast";
import Astronomy from "./Astronomy";
import Alerts from "./Alerts";
import Geolocation from "./Geolocation";
import Weather from './Weather';
import Hours from './Hours';

const apiKey = process.env.REACT_APP_API_KEY;
const dayLimit = "5";

function App() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState("");
  const [astronomy, setAstronomy] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const currentHour = currentTime.getHours();

  function fetchWeatherData(query) {
    axios
      .get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=${dayLimit}&aqi=yes&alerts=yes`)
      .then((response) => {
        setError("");
        setWeather(response.data);

        axios
          .get(`https://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${query}`)
          .then((response) => {
            setAstronomy(response.data);
          })
          .catch((error) => {
            console.error("Error fetching astronomy data:", error);
            setAstronomy("");
          });

        if (response.data.alert && response.data.alert.length > 0) {
          setAlerts(response.data.alert);
        } else {
          setAlerts([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        alert("Err! Something went wrong. \n Please try again after some time.");
        setWeather("");
        setAstronomy("");
        setAlerts([]);
      });
  }

  function search() {
    if (location) {
      fetchWeatherData(location);
    } else {
      alert("Please enter a location.");
    }
  }

  useEffect(() => {
    // Update the current time every second
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <Geolocation onGeolocation={fetchWeatherData} />

      <div>
        <p>Date: {currentTime.toDateString()}</p>
    
        <p>Time: {currentTime.toLocaleTimeString()}</p>
        {weather && <Weather weather={weather} />}
        
        {weather && weather.forecast && <Forecast forecastData={weather.forecast.forecastday} />}

        {weather && weather.forecast && <Hours hourlyData={weather.forecast.forecastday[0].hour} currentHour={currentHour} />}

        {astronomy && <Astronomy astronomyData={astronomy} locationName={weather.location.name} />}

        {alerts.length > 0 && <Alerts alertsData={alerts} />}

         <iframe width="300" height="300"
        src="https://embed.windy.com/embed2.html?lat=19.311&lon=71.587&detailLat=22.999&detailLon=72.576&width=300&height=300&zoom=5&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=true&type=map&location=coordinates&detail=&metricWind=m%2Fs&metricTemp=default&radarRange=-1"
        frameborder="0" title="wind"></iframe> 
      </div>

      <center>
        <input type="text" placeholder="Enter City" value={location} onChange={(e) => setLocation(e.target.value)} />
        <br /><br />
        <button onClick={search}>Search</button>
        
      </center>
    </div>
  );
}

export default App;
