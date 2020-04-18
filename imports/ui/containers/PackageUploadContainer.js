import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { PackageUpload } from '../components';
import { Files } from '../../api/files.js';

const PackageUploadContainer = withTracker((props) => {
  const filesHandle = Meteor.subscribe('files.all');
  const docsReadyYet = filesHandle.ready();
  const files = Files.find({}, { sort: { name: 1 } }).fetch();

  return {
    docsReadyYet,
    files,
  };
})(PackageUpload);

export { PackageUploadContainer };
