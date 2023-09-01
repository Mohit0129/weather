import { useEffect } from "react";

function Geolocation({ onGeolocation }) {
  useEffect(() => {
    function getLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            onGeolocation(`${latitude},${longitude}`);
          },
          (error) => {
            console.error("Error fetching user's location:", error);
            alert("Error fetching user's location. Please enter a city manually.");
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        alert("Geolocation is not supported by this browser. Please enter a city manually.");
      }
    }

    getLocationWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default Geolocation;