import React, { useEffect, useState } from 'react';
import './index.css';
import DateBuilder from './components/DateBuilder'
import WeatherIcon from './components/WeatherIcon';
import { makeStyles } from "@material-ui/core/styles";
import useGeoLocation from './locationHook/useGeoLocation';
import WaitAnimation from './components/WaitAnimation';

const useStyles = makeStyles(() => ({
  cold: {
    minHeight: '100vh',
    transition: '2s ease',
    background: 'linear-gradient(135deg, #022061 0%, #C9F6FF 100%)',
  },
  warm: {
    minHeight: '100vh',
    transition: '2s ease',
    background: 'linear-gradient(135deg, #E24125 0%, #F2E03F 100%)',
  },
  mainContainer: {
    width: '100vw',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginBottom: '75px',
  },
  inputSearch: {
    width: '280px',
    padding: '15px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: ' 0  0 16px 16px',
    border: 'none',
    outline: 'none',
    boxShadow: '0 3px rgba(0, 0, 0, 0.2)',
    color: '#313131',
    fontSize: '20px',
    transition: '0.4s ease',
    '&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.75)',
    },
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

  },
  message: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    height: '60vh',
    color: '#fff',
    fontSize: '32px',
    textShadow: '2px 2px rgba(50, 50, 70, 0.5)',
  },
  defaultIconImg: {
    display: 'block',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    padding: '10px 10px',
    marginBottom: '30px',
    boxShadow: '3px 5px rgba(0, 0, 0, 0.2)',
  },
  city: {
    color: '#fff',
    fontSize: '32px',
    fontWeight: '500',
    margin: '15px',
    textShadow: '3px 3px rgba(50, 50, 70, 0.5)',
  },
  weatherContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: '30px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    padding: '15px 25px',
    color: '#fff',
    fontWeight: '900',
    textShadow: '3px 3px rgba(50, 50, 70, 0.5)',
    boxShadow: '3px 5px rgba(0, 0, 0, 0.2)',
  },
  temperature: {
    fontSize: '100px',
    '@media (max-width: 362px)': {
      fontSize: '70px',
    }
  },
  weatherDesc: {
    color: '#fff',
    fontSize: '32px',
    fontWeight: '700',
    textAlign: 'center',
    textShadow: '3px 3px rgba(50, 50, 70, 0.5)',
    textTransform: 'capitalize',
    margin: '20px 0 10px 0',
  },
}));

const App = () => {
  const classes = useStyles();
  const [query, setQuery] = useState('')
  const [submittedValue, setSubmittedValue] = useState('')
  const [weather, setWeather] = useState({})
  const [notFound, setNotFound] = useState('');
  const location = useGeoLocation();

  const defaultIcon = `http://openweathermap.org/img/wn/02d@2x.png`;
  const errorIcon = `http://openweathermap.org/img/wn/11d@2x.png`;

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setNotFound('')
    setSubmittedValue(query)
    setQuery('')
  }

  const handleApiErrors = (res) => {
    console.log(res)
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res;
  }

  useEffect(() => {
    const apiKey = process.env.REACT_APP_OPENWEATHERAPI_API_KEY;
    if (submittedValue !== '') {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${submittedValue}&units=metric&APPID=${apiKey}`)
        // .then(res => res.json())
        .then(handleApiErrors)
        .then(res => res.json())
        .then(result => { setWeather(result) })
        .catch(error => {
          setNotFound(error)
        });
    }
  }, [submittedValue])

  useEffect(() => {
    const apiKey = process.env.REACT_APP_OPENWEATHERAPI_API_KEY;
    if (!location.error) {
      if (submittedValue === '' && location.loaded === true) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coordinates.lat}&lon=${location.coordinates.lng}&units=metric&appid=${apiKey}`)
          .then(res => res.json())
          .then(result => setWeather(result));
      }
    }
  }, [location, submittedValue])

  return (

    <div className={(typeof weather.main !== 'undefined')
      ? ((Math.round(weather.main.temp) <= 12)
        ? `${classes.cold}`
        : `${classes.warm}`)
      : `${classes.cold}`}
    >
      <div className={classes.mainContainer}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <input
            type='text'
            className={classes.inputSearch}
            placeholder='Search...'
            onChange={handleChange}
            value={query}
          />
        </form>
        {(typeof weather.main !== 'undefined') ?
          notFound ?
            (<div className={classes.message}>
              <img className={classes.defaultIconImg} src={`${errorIcon}`} alt='weather icon' />
              <p>City not found</p>
            </div>)
            : (<div className={classes.content}>
              <p className={classes.city}>{weather.name}, {weather.sys.country}</p>
              <DateBuilder date={new Date()} />
              <div className={classes.weatherContainer}>
                <div className={classes.temperature}>{Math.round(weather.main.temp)} °C</div>
                <WeatherIcon weather={weather.weather[0].main} />
                <p className={classes.weatherDesc}>{weather.weather[0].description}</p>
              </div>
            </div>)
          :
          location.loaded ?
            location.error ?
              (<div className={classes.message}>{location.error.message}</div>)
              : null
            :
            (<div className={classes.message}>
              <img className={classes.defaultIconImg} src={`${defaultIcon}`} alt='weather icon' />
              <p>Please wait</p>
              <WaitAnimation />
            </div>)
        }
      </div>
    </div>
  );
}

export default App;
