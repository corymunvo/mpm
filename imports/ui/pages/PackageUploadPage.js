import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { PackageUploadContainer } from "../containers";
import { createPackage } from "../../api/packages.js";
import { useHistory } from "react-router-dom";
import { Auth } from "../Auth";

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

const PackageUploadPage = () => {
  const classes = useStyles();
  let history = useHistory();

  const [errors, setErrors] = React.useState({});

  const handleSubmit = (package) => {
    console.log("submitting");
    createPackage.call(
      {
        name: package.name,
        description: package.description,
        fileId: package.file && package.file._id,
      },
      (err, res) => {
        if (err) {
          setErrors(err);
        } else {
          history.push("/package-approval");
        }
      }
    );
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <PackageUploadContainer errors={errors} onSubmit={handleSubmit} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export { PackageUploadPage };
