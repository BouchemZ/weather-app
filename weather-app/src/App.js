import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

const apiKey = 'f11eaa961da28fb3f6b616d3c0ba5979';
const apiEndpoint = 'https://api.openweathermap.org/data/2.5/weather?';

function Search() {
  const [searchData, setSearchData] = useState(null);
  const [cityName, setCityName] = useState("London");
}

function App() {
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [currentData, setCurrentData] = useState(null);
  
  useEffect(() => {
    // get coords from navigator, if it fails the lat and long are set to that of london
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    },(err) => {
        setLatitude(51.509865);
        setLongitude(-0.118092);
    });
    axios.get(`${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
    .then(response => {setCurrentData(response.data)});
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>You're in {currentData.name}</p>
        <p>It's is currently {currentData.main.temp}°C, feels like {currentData.main.feels_like}°C</p>
        <p>Humidity is at {currentData.main.humidity}%</p>
      </header>
    </div>
  );
}

export default App;
