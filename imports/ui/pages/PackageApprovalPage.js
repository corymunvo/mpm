import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { ApprovalsContainer } from "../containers";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

const PackageApprovalPage = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <ApprovalsContainer
            summary={false}
            approvals={true}
            title="Approvals"
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export { PackageApprovalPage };
