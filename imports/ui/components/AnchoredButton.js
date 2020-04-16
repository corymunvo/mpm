import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const AnchoredButton = ({ to, children, ...rest }) => {
  return (
    <Button component={Link} to={to} {...rest}>
      {children}
    </Button>
  );
};

export { AnchoredButton };
