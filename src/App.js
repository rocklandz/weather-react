import axios from 'axios';
import React, { useState } from 'react';
import Loader from './Loader';
import { getTime } from './utils';
import icons from './icons/iconSrc';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);

    try {
      const { data } = await axios.get(
        `https://openweathermap.org/data/2.5/weather?q=${city}&appid=439d4b804bc8187953eb36d2a8c26a02`
      );

      setLoading(false);
      setWeather(data);
    } catch (error) {
      console.log(error);

      setError(true);
      setLoading(false);
      setWeather('');
    }
  };

  return (
    <div id='wrapper'>
      <div className='container'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type='text'
            autoComplete='off'
            className='searchbox'
            placeholder='Search for a city...'
            maxLength='50'
            required
          />
          <button type='submit' className='search-button'>
            <i className='fas fa-search'></i>
          </button>
        </form>
        {error && <p className='error-message'>Can not find this city.</p>}
        {loading ? (
          <Loader />
        ) : weather ? (
          <div className='content'>
            <div className='location'>
              <div className='city'>
                {weather.name}, {weather.sys.country}
              </div>
              <div className='date'>{getTime()}</div>
            </div>
            <div className='current'>
              <div className='temp'>{Math.round(weather.main.temp)}°c</div>
              <div className='weather'>
                <img
                  width='50'
                  height='50'
                  src={icons[`icon${weather.weather[0].icon}`]}
                  alt='icon'
                />
                <span>{weather.weather[0].main}</span>
              </div>
              <div className='hi-low'>
                {Math.round(weather.main.temp_min)}°c /{' '}
                {Math.round(weather.main.temp_max)}°c
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default App;
