import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import GroupIcon from '@material-ui/icons/Group';
import { blue } from '@material-ui/core/colors';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

const SelectGroupModal = ({ onClose, selectedValue, open, groups }) => {
  const classes = useStyles();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="select-group" open={open}>
      <DialogTitle id="select-group">Select Group</DialogTitle>
      <List>
        {groups.map((group) => (
          <ListItem
            button
            onClick={() => handleListItemClick(group)}
            key={group._id}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <GroupIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={group.name} />
          </ListItem>
        ))}

        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick('createGroup')}
        >
          <ListItemAvatar>
            <Avatar>
              <GroupAddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Create Group" />
        </ListItem>
      </List>
    </Dialog>
  );
};

SelectGroupModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  groups: PropTypes.array.isRequired,
};

export { SelectGroupModal };
