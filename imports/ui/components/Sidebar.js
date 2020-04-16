import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Meteor } from 'meteor/meteor';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import { AnchoredListItem } from './AnchoredListItem';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/PersonAdd';
import GroupIcon from '@material-ui/icons/Group';
import { Auth } from '../Auth';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  return (
    <List>
      <ListSubheader>Main</ListSubheader>
      <AnchoredListItem button className={classes.nested} to="/">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Overview" />
      </AnchoredListItem>
      {Auth.isAdmin() && (
        <>
          <ListSubheader>Access</ListSubheader>
          <List component="div" disablePadding>
            <AnchoredListItem
              button
              className={classes.nested}
              to="/manage-users"
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </AnchoredListItem>
            <AnchoredListItem
              button
              className={classes.nested}
              to="/manage-groups"
            >
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Groups" />
            </AnchoredListItem>
          </List>
        </>
      )}
      <ListSubheader>Package</ListSubheader>
      <List component="div" disablePadding>
        <AnchoredListItem
          button
          className={classes.nested}
          to="/package-approval"
        >
          <ListItemIcon>
            <PlaylistAddCheckIcon />
          </ListItemIcon>
          <ListItemText primary="Approval" />
        </AnchoredListItem>
        <AnchoredListItem
          button
          className={classes.nested}
          to="/package-history"
        >
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="History" />
        </AnchoredListItem>
      </List>
      {Auth.isAdmin() && (
        <>
          <ListSubheader>Platform</ListSubheader>
          <List component="div" disablePadding>
            <AnchoredListItem button className={classes.nested} to="/configure">
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Configure" />
            </AnchoredListItem>
          </List>
        </>
      )}
    </List>
  );
};

export { Sidebar };
