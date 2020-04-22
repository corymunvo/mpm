import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { GroupsContainer } from '../containers';
import { AnchoredButton } from '../components';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const GroupsPage = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <AnchoredButton
          color="primary"
          startIcon={<GroupAddIcon />}
          to="/create-group"
        >
          Create Group
        </AnchoredButton>

        <Paper className={classes.paper}>
          <GroupsContainer />
        </Paper>
      </Grid>
    </Grid>
  );
};

export { GroupsPage };
