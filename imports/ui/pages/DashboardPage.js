import React from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Server } from '../components';
import { WelcomeContainer, ApprovalsContainer } from '../containers';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 200,
  },
}));

const DashboardPage = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={6}>
        <Paper className={fixedHeightPaper}>
          <WelcomeContainer />
        </Paper>
      </Grid>
      {/* Servers */}
      <Grid item xs={12} md={3} lg={3}>
        <Paper className={fixedHeightPaper}>
          <Server name="Stage" status="Available" date="March 12, 2020" />
        </Paper>
      </Grid>
      <Grid item xs={12} md={3} lg={3}>
        <Paper className={fixedHeightPaper}>
          <Server name="Prod" status="Available" date="March 12, 2020" />
        </Paper>
      </Grid>
      {/* Recent ApprovalsContainer */}
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <ApprovalsContainer summary={true} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export { DashboardPage };
