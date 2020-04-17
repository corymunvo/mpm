import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { PackageView } from '../components';
import { useHistory, useParams } from 'react-router-dom';
import { PackagesCollection } from '../../api/packages.js';
import { COMPLETE } from '../constants';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const PackageViewPage = () => {
  const classes = useStyles();
  let history = useHistory();
  let { id } = useParams();

  package = PackagesCollection.findOne({ _id: id });

  const handleApproval = () => {
    PackagesCollection.update(id, {
      $set: { status: COMPLETE },
    });
    history.push('/package-history');
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        <Paper className={classes.paper}>
          <PackageView onApproval={handleApproval} package={package} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export { PackageViewPage };
