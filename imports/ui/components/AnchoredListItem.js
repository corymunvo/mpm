import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';

const AnchoredListItem = ({ to, children, ...rest }) => {
  return (
    <ListItem component={Link} to={to} {...rest}>
      {children}
    </ListItem>
  );
};

export { AnchoredListItem };
