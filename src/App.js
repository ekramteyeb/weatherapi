//import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Display = ({weather}) => {
  return (
    <div style={{border:'3px solid cyan', width:'30%', margin:'auto 6px', borderRadius:'2em', display:'inline-block'}}>
      <h4>{weather.location.country}</h4>
      <h6>{weather.location.name}</h6>
      <p>{weather.current.temperature} °C , {weather.current.weather_descriptions}</p>
      <p>Feels like : {weather.current.feelslike} °C</p>
      <p>{weather.current.is_day === 'yes' ? 'Day time' : 'Night time'}</p>
      <p> <img src={weather.current.weather_icons} alt='weather-icons'/></p>
    </div>
  )
}

function App() {
 
  const [weather, setWeather] = useState('');
  const [localWeather, setLocalWeather] = useState('');
  const [search, setSearch] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    
      axios.get(`http://api.weatherstack.com/current?access_key=0eb359255fcd0e26c9084ad71e7ef14b&query=fetch:ip`) 
      .then(response => setLocalWeather(response.data))
    
  }, [])

  useEffect(() => {
      if(search !== '')
      axios.get(`http://api.weatherstack.com/current?access_key=0eb359255fcd0e26c9084ad71e7ef14b&query=${search}`) 
      .then(response => setWeather(response.data))
    
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
        {localWeather ? <Display weather={localWeather} /> : 'nothing to display'}
        {weather ? <Display weather={weather} /> : ''}
        
        
        {console.log(weather)}
      </header>
    </div>
  );
}

export default App;
