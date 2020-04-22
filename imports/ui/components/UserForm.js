import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const UserForm = ({ title, data, errors, onSubmit }) => {
  const showErrors = {};

  errors.details &&
    errors.details.forEach((fieldError) => {
      console.log(fieldError);
      showErrors[fieldError.name] = fieldError.message;
    });

  const [state, setState] = React.useState(
    Object.assign(
      {
        username: "",
        password: "",
        isAdmin: false,
      },
      data || {}
    )
  );

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleCheckbox = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            error={showErrors.username ? true : false}
            helperText={showErrors.username}
            id="username"
            label="Username"
            name="username"
            value={state.username}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            error={showErrors.password ? true : false}
            helperText={showErrors.password}
            name="password"
            label="Password"
            type="password"
            id="password"
            value={state.password}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                name="isAdmin"
                onChange={handleCheckbox}
                value={state.isAdmin}
              />
            }
            label="Admin user?"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              onSubmit(state);
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

UserForm.propTypes = {
  title: PropTypes.string,
  data: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
  }),
  onSubmit: PropTypes.func,
};

export { UserForm };
