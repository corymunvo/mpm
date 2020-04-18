import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Files } from '../../api/files';
import { IndividualFile } from '.';
import { DropzoneArea } from 'material-ui-dropzone';

const debug = require('debug')('demo:file');

class PackageUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploading: [],
      progress: 0,
      inProgress: false,
      name: '',
      description: '',
    };

    this.uploadIt = this.uploadIt.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    self.setState({ ...state, [event.target.name]: event.target.value });
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
            streams: 'dynamic',
            chunkSize: 'dynamic',
            allowWebWorkers: true, // If you see issues with uploads, change this to false
          },
          false
        );

        self.setState({
          uploading: uploadInstance, // Keep track of this instance to use below
          inProgress: true, // Show the progress bar now
        });

        // These are the event functions, don't need most of them, it shows where we are in the process

        uploadInstance.on('uploaded', function (error, fileObj) {
          // Reset our state for the next file
          self.setState({
            uploading: [],
            progress: 0,
            inProgress: false,
          });
        });

        uploadInstance.on('error', function (error, fileObj) {
          console.log('Error during upload: ' + error);
        });

        uploadInstance.on('progress', function (progress, fileObj) {
          console.log('Upload Percentage: ' + progress);
          // Update our progress bar
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
    console.log('**********************************', this.state.uploading);

    if (this.state.uploading.file) {
      return (
        <div>
          {this.state.uploading.file.name}

          <div className="progress progress-bar-default">
            <div
              style={{ width: this.state.progress + '%' }}
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
    debug('Rendering Files', this.props.docsReadyYet);
    if (this.props.files && this.props.docsReadyYet) {
      let fileCursors = this.props.files;

      // Run through each file that the user has stored
      // (make sure the subscription only sends files owned by this user)
      let display = fileCursors.map((aFile, key) => {
        // console.log('A file: ', aFile.link(), aFile.get('name'))
        let link = Files.findOne({ _id: aFile._id }).link(); //The "view/download" link

        // Send out components that show details of each file
        return (
          <div key={'file' + key}>
            <IndividualFile
              fileName={aFile.name}
              fileUrl={link}
              fileId={aFile._id}
              fileSize={aFile.size}
            />
          </div>
        );
      });

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
                value={this.state.description}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <DropzoneArea
                acceptedFiles={['csv, application/vnd.ms-excel, text/csv']}
                onChange={this.uploadIt}
                type="file"
                showPreviews={false}
                id="fileinput"
                showPreviewsInDropzone={false}
                filesLimit={1}
                disabled={this.state.inProgress}
                ref="fileinput"
              />
            </Grid>
            <Grid item xs={12}>
              {this.showUploads()}
              {display}
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  // onSubmit(state);
                }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </>
      );
    } else return <div>Loading file list</div>;
  }
}

export { PackageUpload };
