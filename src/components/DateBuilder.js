import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  date: {
    color: '#fff',
    fontSize: '20px',
    fontWeight: '300',
    fontStyle: 'italic',
    textShadow: '2px 2px rgba(50, 50, 70, 0.5)',
  },
}))

const DateBuilder = (props) => {
  const { date } = props
  const classes = useStyles();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const todaysDate = date.toLocaleDateString("en-UK", options);

  return (
    <p className={classes.date}>{todaysDate}</p>
  )
}

export default DateBuilder;