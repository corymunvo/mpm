import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

import { Files } from "../../api/files";
import { IndividualFile } from ".";
import { DropzoneArea } from "material-ui-dropzone";

const debug = require("debug")("demo:file");

class PackageUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploading: [],
      progress: 0,
      inProgress: false,
      name: "",
      description: "",
      file: null,
    };

    this.uploadIt = this.uploadIt.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }

  uploadIt(files) {
    let self = this;

    if (files) {
      // We upload only one file, in case
      // there was multiple files selected
      var file = files[0];

      if (file) {
        let uploadInstance = Files.insert(
          {
            file: file,
            meta: {
              locator: self.props.fileLocator,
              userId: Meteor.userId(), // Optional, used to check on server for file tampering
            },
            streams: "dynamic",
            chunkSize: "dynamic",
            allowWebWorkers: true, // If you see issues with uploads, change this to false
          },
          false
        );

        self.setState({
          uploading: uploadInstance, // Keep track of this instance to use below
          inProgress: true, // Show the progress bar now
        });

        // These are the event functions, don't need most of them, it shows where we are in the process

        uploadInstance.on("uploaded", function (error, fileObj) {
          self.setState({
            uploading: [],
            progress: 0,
            inProgress: false,
            file: fileObj,
          });
        });

        uploadInstance.on("error", function (error, fileObj) {
          console.log("Error during upload: " + error);
        });

        uploadInstance.on("progress", function (progress, fileObj) {
          self.setState({
            progress: progress,
          });
        });

        uploadInstance.start(); // Must manually start the upload
      }
    }
  }

  // This is our progress bar, bootstrap styled
  // Remove this function if not needed
  showUploads() {
    if (this.state.uploading.file) {
      return (
        <div>
          {this.state.uploading.file.name}

          <div className="progress progress-bar-default">
            <div
              style={{ width: this.state.progress + "%" }}
              aria-valuemax="100"
              aria-valuemin="0"
              aria-valuenow={this.state.progress || 0}
              role="progressbar"
              className="progress-bar"
            >
              <span className="sr-only">
                {this.state.progress}% Complete (success)
              </span>
              <span>{this.state.progress}%</span>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    const showErrors = {};
    const { errors, onSubmit } = this.props;
    errors.details &&
      errors.details.forEach((fieldError) => {
        console.log(fieldError);
        showErrors[fieldError.name] = fieldError.message;
      });

    // if (this.props.files && this.props.docsReadyYet) {
    // let fileCursors = this.props.files;

    // // Run through each file that the user has stored
    // // (make sure the subscription only sends files owned by this user)
    // let display = fileCursors.filter((file) => {

    // }).map((aFile, key) => {
    //   // console.log('A file: ', aFile.link(), aFile.get('name'))
    //   let link = Files.findOne({ _id: aFile._id }).link();

    //   // Send out components that show details of each file
    //   return (
    //     <div key={"file" + key}>
    //       <IndividualFile
    //         fileName={aFile.name}
    //         fileUrl={link}
    //         fileId={aFile._id}
    //         fileSize={aFile.size}
    //       />
    //     </div>
    //   );
    // });

    return (
      <>
        <Typography variant="h6" gutterBottom>
          Upload Package
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              error={showErrors.name ? true : false}
              helperText={showErrors.name}
              value={this.state.name}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="description"
              label="Description"
              id="description"
              error={showErrors.description ? true : false}
              helperText={showErrors.description}
              value={this.state.description}
              onChange={this.handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl
              required
              error={showErrors.fileId ? true : false}
              component="fieldset"
              style={{ width: "100%" }}
            >
              {this.state.file ? (
                <Grid item xs={12}>
                  <IndividualFile
                    fileName={this.state.file.name}
                    fileId={this.state.file._id}
                    fileSize={this.state.file.size}
                  />
                </Grid>
              ) : (
                <DropzoneArea
                  filesLimit={1}
                  acceptedFiles={["xml,  text/xml"]}
                  onChange={this.uploadIt}
                  type="file"
                  showPreviews={false}
                  id="fileinput"
                  showPreviewsInDropzone={false}
                  filesLimit={1}
                  disabled={this.state.inProgress}
                  ref="fileinput"
                />
              )}
              {showErrors.fileId && (
                <FormHelperText>You must upload a package</FormHelperText>
              )}
              {this.showUploads()}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                onSubmit(this.state);
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
}

export { PackageUpload };
