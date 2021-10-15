import React from 'react';

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  weather: {

  },
}))

const WeatherIcon = (props) => {
  const { weather } = props
  const classes = useStyles();

  let pngIcon = { weather };
  switch (weather) {
    case 'Clear':
      pngIcon = '01d@2x';
      break;
    case 'Clouds':
      pngIcon = '02d@2x';
      break;
    case 'Rain':
      pngIcon = '10d@2x';
      break;
    case 'Thunderstorm':
      pngIcon = '11d@2x';
      break;
    case 'Snow':
      pngIcon = '13d@2x';
      break;
    case 'Drizzle':
      pngIcon = '09d@2x';
      break;
    case 'Mist':
      pngIcon = '50d@2x';
      break;
    case 'Smoke':
      pngIcon = '50d@2x';
      break;
    case 'Haze':
      pngIcon = '50d@2x';
      break;
    case 'Dust':
      pngIcon = '50d@2x';
      break;
    case 'Fog':
      pngIcon = '50d@2x';
      break;
    case 'Sand':
      pngIcon = '50d@2x';
      break;
    case 'Ash':
      pngIcon = '50d@2x';
      break;
    case 'Squall':
      pngIcon = '50d@2x';
      break;
    case 'Tornado':
      pngIcon = '50d@2x';
      break;
    default:
      pngIcon = 'undefined';
  }

  const displayIcon = (pngIcon) => {
    const icon = `http://openweathermap.org/img/wn/${pngIcon}.png`;
    if (pngIcon) {
      return <img className={classes.weather} src={`${icon}`} alt='weather icon' />
    }
    return null
  }

  return (
    displayIcon(pngIcon)
  )
}

export default WeatherIcon;