import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { UserForm } from '../components';
import { Accounts } from 'meteor/accounts-base';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const CreateUserPage = () => {
  const classes = useStyles();
  let history = useHistory();

  const handleSubmit = ({ username, password, isAdmin, ...rest }) => {
    Meteor.call('user.createUser', username, password, isAdmin);
    history.push('/manage-users');
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        <Paper className={classes.paper}>
          <UserForm title="Create User" onSubmit={handleSubmit} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export { CreateUserPage };
