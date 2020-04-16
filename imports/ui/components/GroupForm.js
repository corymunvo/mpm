import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import MomentUtils from '@date-io/moment';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const GroupForm = ({ title, data = {}, onSubmit }) => {
  const classes = useStyles();

  const [state, setState] = React.useState(
    Object.assign(
      {
        name: '',
        rights: {
          schemas: true,
          forms: true,
          webforms: true,
          users: true,
          accessRights: true,
          operatorGroups: true,
          typologies: true,
          folders: false,
          campaigns: false,
          workflows: false,
          personalizationBlocks: false,
          deliveries: false,
        },
        autodeploy: false,
        autodeployFreq: 'immediately',
        autodeployTime: new Date('2014-08-18T21:11:54'),
      },
      data
    )
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(state);
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleDateChange = (date) => {
    setState({ ...state, autodeployTime: date });
  };

  const handleCheckbox = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleSwitchChange = (event) => {
    let rights = { ...state.rights };
    rights[event.target.name] = event.target.checked;
    setState({ ...state, rights });
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            name="name"
            label="Group Name"
            fullWidth
            value={state.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Permissions</FormLabel>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={state.rights.schemas}
                  onChange={handleSwitchChange}
                  name="schemas"
                />
              }
              label="Schemas"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={state.rights.forms}
                  onChange={handleSwitchChange}
                  name="forms"
                />
              }
              label="Forms"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={state.rights.webforms}
                  onChange={handleSwitchChange}
                  name="webforms"
                />
              }
              label="Webforms"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={state.rights.users}
                  onChange={handleSwitchChange}
                  name="users"
                />
              }
              label="Users"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={state.rights.accessRights}
                  onChange={handleSwitchChange}
                  name="accessRights"
                />
              }
              label="Access Rights"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={state.rights.operatorGroups}
                  onChange={handleSwitchChange}
                  name="operatorGroups"
                />
              }
              label="Operator Groups"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={6}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={state.rights.typologies}
                  onChange={handleSwitchChange}
                  name="typologies"
                />
              }
              label="Typologies"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={state.rights.folders}
                  onChange={handleSwitchChange}
                  name="folders"
                />
              }
              label="Folders"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={state.rights.campaigns}
                  onChange={handleSwitchChange}
                  name="campaigns"
                />
              }
              label="Campaigns"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={state.rights.workflows}
                  onChange={handleSwitchChange}
                  name="workflows"
                />
              }
              label="Workflows"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={state.rights.personalizationBlocks}
                  onChange={handleSwitchChange}
                  name="personalizationBlocks"
                />
              }
              label="Personalization Blocks"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={state.rights.deliveries}
                  onChange={handleSwitchChange}
                  name="deliveries"
                />
              }
              label="Deliveries"
            />
          </FormGroup>
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                name="autodeploy"
                onChange={handleCheckbox}
                value={state.autodeploy}
              />
            }
            label="Deploy automatically if no conflicts or approvals?"
          />
        </Grid>
        {state.autodeploy && (
          <>
            <Grid item xs={6}>
              <FormControl className={classes.formControl}>
                <InputLabel id="autodeployFreq">Deployment Date</InputLabel>
                <Select
                  labelId="autodeployFreq"
                  name="autodeployFreq"
                  value={state.autodeployFreq}
                  onChange={handleChange}
                >
                  <MenuItem value="immediately">Immediately</MenuItem>
                  <MenuItem value="saturday">Saturday</MenuItem>
                  <MenuItem value="sunday">Sunday</MenuItem>
                  <MenuItem value="monday">Monday</MenuItem>
                  <MenuItem value="tuesday">Tuesday</MenuItem>
                  <MenuItem value="wednesday">Wednesday</MenuItem>
                  <MenuItem value="thursday">Thursday</MenuItem>
                  <MenuItem value="friday">Friday</MenuItem>
                  <MenuItem value="eom">End of Month</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl className={classes.formControl}>
                <KeyboardTimePicker
                  id="mui-pickers-time"
                  label="Deployment Time"
                  format="hh:mm A"
                  value={state.autodeployTime}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </FormControl>
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

GroupForm.propTypes = {
  title: PropTypes.string,
  data: PropTypes.shape({
    name: PropTypes.string,
    rights: PropTypes.object,
    autodeploy: PropTypes.bool,
    autodeployFreq: PropTypes.string,
    autodeployTime: PropTypes.instanceOf(Date),
  }),
  onSubmit: PropTypes.func,
};

export { GroupForm };
