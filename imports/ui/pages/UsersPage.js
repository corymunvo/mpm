import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { UsersContainer, SelectGroupModalContainer } from '../containers';
import { AnchoredButton } from '../components';
import { useHistory } from 'react-router-dom';

import PersonAddIcon from '@material-ui/icons/PersonAdd';

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

const UsersPage = () => {
  const classes = useStyles();
  let history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState(false);

  const handleClickOpen = (id) => {
    setOpen(true);
    setSelectedUserId(id);
  };

  const handleClose = (group) => {
    setOpen(false);
    if (group == 'createGroup') {
      history.push('/create-group');
    } else {
      Meteor.call('user.setGroup', selectedUserId, group);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <AnchoredButton
          color="primary"
          startIcon={<PersonAddIcon />}
          to="/create-user"
        >
          Create User
        </AnchoredButton>
        <Paper className={classes.paper}>
          <UsersContainer
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
          />
        </Paper>
      </Grid>
      <SelectGroupModalContainer onClose={handleClose} open={open} />
    </Grid>
  );
};

export { UsersPage };
