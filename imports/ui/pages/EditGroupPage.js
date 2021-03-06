import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { GroupForm } from "../components";
import { useHistory, useParams } from "react-router-dom";
import { GroupsCollection, groupSchema } from "../../api/groups.js";
import { updateGroup } from "../../api/groups.js";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const EditGroupPage = () => {
  const classes = useStyles();
  let history = useHistory();
  let { id } = useParams();

  const group = GroupsCollection.findOne({ _id: id });

  const [errors, setErrors] = React.useState({});

  const handleSubmit = (group) => {
    delete group._id;
    updateGroup.call({ id, group }, (err, res) => {
      if (err) {
        setErrors(err);
      } else {
        history.push("/manage-groups");
      }
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        <Paper className={classes.paper}>
          <GroupForm
            errors={errors}
            onSubmit={handleSubmit}
            data={group}
            title="Edit Group"
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export { EditGroupPage };
