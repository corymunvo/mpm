import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { UserForm } from "../components";
import { useHistory } from "react-router-dom";
import { createUser } from "../../api/users.js";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const CreateUserPage = () => {
  let history = useHistory();
  const classes = useStyles();
  const [errors, setErrors] = React.useState({});

  const handleSubmit = (user) => {
    createUser.call(user, (err, res) => {
      if (err) {
        setErrors(err);
      } else {
        history.push("/manage-users");
      }
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        <Paper className={classes.paper}>
          <UserForm
            title="Create User"
            onSubmit={handleSubmit}
            errors={errors}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export { CreateUserPage };
