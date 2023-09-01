import React from "react";

function Astronomy({ astronomyData, locationName }){
  return (
    <div>
      <center>
        <h3>Astronomy for {locationName}</h3>
        <p>Sunrise: {astronomyData.astronomy.astro.sunrise}</p>
        <p>Sunset: {astronomyData.astronomy.astro.sunset}</p>
        <p>Moonrise: {astronomyData.astronomy.astro.moonrise}</p>
        <p>Moonset: {astronomyData.astronomy.astro.moonset}</p>
        <p>Moon Phase: {astronomyData.astronomy.astro.moon_phase}</p>
      </center>
    </div>
  );
};

export default Astronomy;
