// resource used from RapidApi weather  api 

//import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'
/* import dotenv from 'dotenv'
dotenv.config() */
require('dotenv').config()

const api_key = process.env.REACT_APP_API_KEY

const Display = ({weather}) => {
  return (
    <div className='DisplayComponent'>
      <h4>{weather.name}</h4>
      <h6>{weather.sys.country}</h6>
      <p>{weather.main.temp} °C , {weather.weather[0].description}</p>
      <p>Feels like : {weather.main.feels_like} °C</p>
{/*       <p>{weather.current.is_day === 'yes' ? 'Day time' : 'Night time'}</p>
 */}   <p> <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather-icons'/></p>
        
    </div>
  )
}

function App() {
 
  const [weather, setWeather] = useState('');
  const [localWeather, setLocalWeather] = useState('');
  const [search, setSearch] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    
    var options = {
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
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        setLocalWeather(response.data)
    }).catch(function (error) {
      console.error(error);
    });
    
  }, [])

  useEffect(() => {
      if(search !== ''){
      var options = {
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/weather',
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
      };

    axios.request(options).then(function (response) {
        console.log(response.data);
        setWeather(response.data)
    }).catch(function (error) {
      console.error(error);
    });
  }
    
  }, [search])

  return (
    <div className="App">
      <header className="App">
        <h1>Weather API</h1>
        <p>Enter a city or country</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type='text' onChange={(e) => setText(e.target.value)}/><br/><br/>
          <input type='submit' onClick={() => setSearch(text)} value='submit'/>
        </form>
        <br/>
        <p>Local weather</p>
        {weather ? <Display weather={weather} /> : ''} 
        {localWeather ? <Display weather={localWeather} /> : 'nothing to display'}
       
        
        {console.log(localWeather)}
        {console.log(weather)}
      </header>
    </div>
  );
}

export default App;
