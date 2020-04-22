import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Title } from './Title';

const Welcome = ({ username }) => (
  <React.Fragment>
    <Title>Welcome {username}</Title>
    <Typography variant="body1" component="p">
      Since your last login there have been:
    </Typography>
    <ul>
      <li>14 new backups run</li>
      <li>3 new automated deployments</li>
      <li>6 new pending approvals</li>
    </ul>
  </React.Fragment>
);

export { Welcome };
