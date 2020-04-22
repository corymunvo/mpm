import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { PackageViewContainer } from "../containers";
import { useHistory, useParams } from "react-router-dom";
import { approvePackage } from "../../api/packages";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const PackageViewPage = () => {
  const classes = useStyles();
  let history = useHistory();
  let { id } = useParams();

  const handleApproval = () => {
    approvePackage.call({ id }, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        history.push("/package-history");
      }
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        <Paper className={classes.paper}>
          <PackageViewContainer onApproval={handleApproval} id={id} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export { PackageViewPage };
