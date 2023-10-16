import React from 'react';

const WeatherCard = ({weather}) => {
    return ( 
        <div className="card">
            <div className="cityData">
                <h2 id="cityName">City = {weather.name}</h2>
                <h3 id="countryCode"> {'Country-Code = ' + weather.sys.country}</h3>
            </div>
            <div className="weatherData">
                <p id="temp-min">Min-Temp = {weather.main.temp_min }</p>
                <p id="temp">Temp = {weather.main.temp }</p>               
                <p id="temp-max">Max-Temp = {weather.main.temp_max}</p>
                
            </div>
            
        </div>


     );
}
 
export default WeatherCard;