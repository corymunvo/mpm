import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const SettingsForm = () => {
  const [state, setState] = React.useState({
    productionUrl: '',
    stagingUrl: '',
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Configure
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="productionUrl"
            name="productionUrl"
            label="Production URL"
            onChange={handleChange}
            value={state.productionUrl}
            fullWidth
            autoComplete="productionUrl"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="stagingUrl"
            name="stagingUrl"
            label="Staging URL"
            onChange={handleChange}
            value={state.stagingUrl}
            fullWidth
            autoComplete="stagingUrl"
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export { SettingsForm };
