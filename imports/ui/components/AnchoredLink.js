import React from 'react';
import { Link as RRLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const AnchoredLink = ({ to, children, ...rest }) => {
  return (
    <Link component={RRLink} to={to} {...rest}>
      {children}
    </Link>
  );
};

export { AnchoredLink };
