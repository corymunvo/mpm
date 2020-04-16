import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { GroupForm } from '../components';
import { useHistory } from 'react-router-dom';
import { GroupsCollection } from '../../api/groups.js';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const CreateGroupPage = () => {
  const classes = useStyles();
  let history = useHistory();

  const handleSubmit = (data) => {
    GroupsCollection.insert(data);
    history.push('/manage-groups');
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        <Paper className={classes.paper}>
          <GroupForm onSubmit={handleSubmit} title="Create Group" />
        </Paper>
      </Grid>
    </Grid>
  );
};

export { CreateGroupPage };
