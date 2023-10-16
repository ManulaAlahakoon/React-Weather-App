import { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import './App.css'

const API_KEY = process.env.REACT_APP_API_KEY;


const App = () => {
const [location, setLocation] = useState('colombo');
const [geoData, setGeoData] = useState([]);
const [weather, setWeather] = useState([]);
const [lat, setLat] = useState(0);
const [lon, setLon] = useState(0);


const getGeoCode = async (query) => {
const response = await fetch(
`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${API_KEY}`
);
const data = await response.json();
console.log(data);
  setGeoData(data);
  /*
const city = data.length > 0 ? data[0] : null;
if (city) {
setLat(city.lat);
setLon(city.lon);
} else {
setLat(0);
setLon(0);
  }
  */
 // getLocationWeather(lat, lon);

};


/*
The setLat and setLon functions are inside the map function, 
which means they will be called multiple times if there are multiple cities in the data array. 
To fix this, you can use the find method instead of map 
to get the first city from the data array and then set the latitude and longitude
*/

const getLocationWeather = async (lat, lon) => {
const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
);
const data = await response.json();
setWeather([data]);


};

/*
useEffect(() => {
getGeoCode(location);
}, [location]);

*/
useEffect(() => {
  geoData.map((city) => setLat(city.lat)) //find func
  geoData.map((city)=>setLon(city.lon))
}, [geoData])
  
useEffect(() => {
getLocationWeather(lat, lon);
}, [lat , lon]); // must change for the correct logic of location

useEffect(() => {
  //console.log(weather[0].name);
  //console.log(weather.sys.country);
  console.log(weather)
  
},[weather])

  function update(c) {
    getGeoCode(c)
  }
 

return (
  <div className="App">
    <div className="search">

<input type="text" onChange={(e) => setLocation(e.target.value)} />
<button onClick={() => update(location)}>Click</button>
   

    </div>


    {
      weather?.length > 0 ? (
        <div className="container">
        {weather.map((city) => <WeatherCard weather={city} />)}
         </div>):(
          <div className="empty">
          <h2>No data found</h2>
          </div>
        )
                   
    }
    
</div>
);
};


export default App;