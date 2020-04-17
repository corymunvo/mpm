import { Meteor } from 'meteor/meteor';
import { PackagesCollection } from '../../api/packages.js';
import { withTracker } from 'meteor/react-meteor-data';
import { PackageTable } from '../components';
import { PAGE_SIZE, COMPLETE } from '../constants';
import { WithLoading } from '../hocs';

const PackagesContainer = withTracker(({ summary }) => {
  // const packagesHandle = Meteor.subscribe('packages');
  // const isLoading = !packagesHandle.ready();
  const packages = PackagesCollection.find({ status: COMPLETE }).fetch();
  const pages = Math.floor(packages.length / PAGE_SIZE) + 1;
  const page = 1;

  return {
    isLoading: false,
    page,
    pages,
    summary,
    packages,
  };
})(WithLoading(PackageTable));

export { PackagesContainer };
