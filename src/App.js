// resource used from RapidApi weather  api 

//import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'
/* import dotenv from 'dotenv'
dotenv.config() */
//require('dotenv').config()



const Display = ({weather}) => {
  return (
    <div className='DisplayComponent'>
      <h2>{weather.name} </h2>
      <h3>{weather.sys.country}</h3>
      <p>{Math.floor(weather.main.temp - 273.13)} °C , {weather.weather[0].description}</p>
      <p>Feels like : {Math.floor(weather.main.feels_like - 273.13)} °C</p>
{/*       <p>{weather.current.is_day === 'yes' ? 'Day time' : 'Night time'}</p>
 */}   <p> <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather-icons'/></p>
        
    </div>
  )
}

function App() {
  const kulf = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState('');
  const [localWeather, setLocalWeather] = useState('');
  const [search, setSearch] = useState('');
  const [text, setText] = useState('');
  const [message, setMessage] = useState(null);
  const [lat , setLat] = useState(null)
  const [lon , setLon] = useState(null)

  window.onload = function () {
  var startPos;
  var geoSuccess = function (position) {
    startPos = position;
    setLat(startPos.coords.latitude)
    setLon(startPos.coords.longitude)
    console.log(startPos.coords.latitude, 'lattitude')
    console.log(startPos.coords.longitude, 'longitude')
    /* document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude; */
  };
    var geoError = function (error) {
    setMessage('App needs to access your location to lookfor local weather info')
    //console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  }

  useEffect(() => {
    
    /* var options = {
      method: 'GET',
      url: 'https://community-open-weather-map.p.rapidapi.com/weather',
      params: {
        q: 'Helsinki',
        lat: '0',
        lon: '0',
        id: '2172797',
        lang: 'null',
        units: 'metric',
        mode: 'xml, html'
      },
      headers: {
        'x-rapidapi-key': api_key,
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
      }
    }; */
    //axios.get(`https://api.openweathermap.org/data/2.5/weather?q=helsinki&appid=${kulf}`)
    if (lat && lon) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${kulf}`)
      .then(function (response) {
        console.log(response.data);
        setLocalWeather(response.data)
        setMessage(null);
      }).catch(function (error) {
        console.error(error);
      });
    } else {
      setMessage('Loading.....')
    }
    
  }, [kulf,lon,lat])

  useEffect(() => {
      if(search !== ''){
     /* var options = {
        method: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/weather',
        params: {
          q: search,
          lat: '0',
          lon: '0',
          id: '2172797',
          lang: 'null',
          units: 'metric',
          mode: 'xml, html'
        },
        headers: {
          'x-rapidapi-key': api_key,
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
        }
      }; */
 
    /* axios.request(options).then(function (response) {
        console.log(response.data);
        setWeather(response.data) */
      //axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${api_key}`)
      //axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${kulf}`)
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${kulf}`)
      .then(function(response) {
        setWeather(response.data)
      })
     .catch(function (error) {
      console.error(error);
    });
  }
    
  }, [search, kulf])

  return (
    <div className="App-header">
      <header className="App">
        <h1>Weather API</h1>
        <p>Enter a city/country </p>
        
        <form  onSubmit={(e) => e.preventDefault()}>
          <input style={{ padding:'6px 10px' }} type='text' onChange={(e) => setText(e.target.value)}/><br/><br/>
          <input style={{ padding:'6px 10px', borderRadius:'8px' }} type='submit' onClick={() => setSearch(text)} value='Submit'/>
        </form>
        <div style={{ margin:'10px' }}>
            <p>Local weather</p>
            <small>{ new Date().toLocaleString()}</small>
        </div>
        <div className='App-content'>
        {weather ? <Display weather={weather} /> : ''} 
        {localWeather ? <Display weather={localWeather} /> : <p >{ message}</p> }
        </div>
      </header>
    </div>
  );
}

export default App;
