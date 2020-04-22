import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Title } from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const Server = ({ name, status, date }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>{name}</Title>
      <Typography component="p" variant="h4">
        {status}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {date}
      </Typography>
    </React.Fragment>
  );
};

export { Server };
