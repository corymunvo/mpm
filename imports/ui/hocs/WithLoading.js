import React from 'react';
import { Loader } from '../components';
import { Fade } from '@material-ui/core';

const WithLoading = (Comp) => ({ isLoading, children, ...props }) => {
  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <Fade in={true} timeout={500}>
        <div>
          <Comp {...props}>{children}</Comp>
        </div>
      </Fade>
    );
  }
};

export { WithLoading };
