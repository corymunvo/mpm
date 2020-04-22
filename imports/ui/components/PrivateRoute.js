import React from 'react';
import { Auth } from '../Auth';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ isLoading, admin = false, children, ...rest }) => {
  const allowed =
    (!admin && Auth.isAuthenticated()) || (admin && Auth.isAdmin());

  return isLoading ? null : (
    <Route
      {...rest}
      render={({ location }) =>
        allowed ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export { PrivateRoute };
