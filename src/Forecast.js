// import React from 'react';

// function Forecast({ forecastData }) {
//   const currentTime = new Date().getHours();

//   // Find the index of the first hour in the forecast data that is greater than the current hour
//   const startIndex = forecastData[0].hour.findIndex(
//     (hour) => parseInt(hour.time.split(' ')[1].slice(0, 2)) > currentTime
//   );

//   // Get the next 2-hour interval forecast
//   const next2HourForecast = forecastData[0].hour.slice(startIndex, startIndex + 2);

//   return (
//     <div>
//       <center>
//         {forecastData.slice(1, 4).map((forecastDay, index) => (
//           <div key={index}>
//             {index === 0 && (
//               <div>
//                 <h5>Next 2-Hour Interval Forecast</h5>
//                 {next2HourForecast.map((hour, hourIndex) => (
//                   <div key={hourIndex}>
//                     <p>Time: {hour.time}</p>
//                     <p>Temperature: {hour.temp_c}°C</p>
//                     <p>Condition: {hour.condition.text}</p>
//                     <img src={hour.condition.icon} alt="Weather Icon" />

//                     {hourIndex !== next2HourForecast.length - 1 && <hr />}
//                   </div>
//                 ))}
//               </div>
//             )}

            
//         <h3>Weather Forecast for the Next 3 Days</h3>

//             <h4>{forecastDay.date}</h4>
//             <p>Max Temperature: {forecastDay.day.maxtemp_c}°C</p>
//             <p>Min Temperature: {forecastDay.day.mintemp_c}°C</p>
//             <p>Condition: {forecastDay.day.condition.text}</p>
//             <img src={forecastDay.day.condition.icon} alt="Weather Icon" />

            

//             {index !== 2 && <hr />}
//           </div>
//         ))}
        
//       </center>
//     </div>
//   );
// }

// export default Forecast;



import React from "react";

function Forecast({ forecastData }) {
  return (
    <div>
      <center>
        <h3>Weather Forecast for the Next 3 Days</h3>
        {forecastData.slice(1, 4).map((forecastDay, index) => (
          <div key={index}>
            <h4>{forecastDay.date}</h4>
            <p>Max Temperature: {forecastDay.day.maxtemp_c}°C</p>
            <p>Min Temperature: {forecastDay.day.mintemp_c}°C</p>
            <p>Rain Probability: {forecastDay.day.daily_chance_of_rain}%</p>
            <p>Condition: {forecastDay.day.condition.text}</p>
            <img src={forecastDay.day.condition.icon} alt="Weather Icon" />
            
            <p>----------------------------------------------------------</p>
            
          </div>
        ))}
      </center>
    </div>
  );
};

export default Forecast;
