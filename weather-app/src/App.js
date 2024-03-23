import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

const apiKey = 'f11eaa961da28fb3f6b616d3c0ba5979';
const apiEndpoint = 'https://api.openweathermap.org/data/2.5/weather?';

/*
function Search() {
  const [searchData, setSearchData] = useState(null);
  const [cityName, setCityName] = useState("London");
}
*/

function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [currentData, setCurrentData] = useState({name: null, main: {temp:null, feels_like:null, humidity:null}, wind: {speed:null}, weather:[{icon: null}]}); //default value in case api call fails
  
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
    .then(response => {setCurrentData(response.data); console.log(response.data)})
    .catch(err => {console.log(err)});
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p1 className='Panel'>
          <c className='Col'>
            <l>You're in {currentData.name}</l>
            <l>{currentData.main.temp}°C &#40;feels like {currentData.main.feels_like}°C&#41;</l>
            <img src={`https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`} alt="weather icon"/>
            <r className='Row'>
              <l> hum. = {currentData.main.humidity}%</l>
              <l> wind = {currentData.wind.speed} m/s</l>
            </r>
          </c>
        </p1>
      </header>
      <footer className='App-footer'>
        <a href="https://github.com/BouchemZ">My github</a>
      </footer>
    </div>
  );
}

export default App;
