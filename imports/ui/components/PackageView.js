import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { Auth } from "../Auth";
import moment from "moment";

const PackageView = ({ package, onApproval }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h2" component="h2">
          {package.name}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1" component="div">
          <p>
            <strong>Id: </strong>
            {package.id}
          </p>

          <p>
            <strong>Description: </strong>
            {package.description}
          </p>
          <p>
            <strong>SubmittedOn: </strong>
            {moment(package.submittedOn).format("MM/DD/YYYY")}
          </p>
          <p>
            <strong>SubmittedBy: </strong>
            {package.submittedBy}
          </p>
          <p>
            <strong>ApprovedOn: </strong>
            {moment(package.approvedOn).format("MM/DD/YYYY")}
          </p>
          <p>
            <strong>ApprovedBy: </strong>
            {package.approvedBy}
          </p>
          <p>
            <strong>Status: </strong>
            {package.status}
          </p>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        {package.conflicts
          ? package.conflicts.map(({ type, name }) => (
              <div key={name}>
                <p>{type}</p>
                <p>{name}</p>
              </div>
            ))
          : "No conflicts"}
      </Grid>
      {Auth.isAdmin() && (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => onApproval()}
        >
          Approve
        </Button>
      )}
    </Grid>
  );
};

PackageView.propTypes = {
  package: PropTypes.shape({
    name: PropTypes.string,
    rights: PropTypes.object,
    autodeploy: PropTypes.bool,
    autodeployFreq: PropTypes.string,
    autodeployTime: PropTypes.instanceOf(Date),
  }),
  onApproval: PropTypes.func,
};

export { PackageView };
