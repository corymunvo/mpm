import { Meteor } from 'meteor/meteor';
import { PackagesCollection } from '../../api/packages.js';
import { withTracker } from 'meteor/react-meteor-data';
import { PackageTable } from '../components';
import { PAGE_SIZE, COMPLETE } from '../constants';
import { WithLoading } from '../hocs';
import { Auth } from '../Auth.js';

const PackagesContainer = withTracker(({ summary, headers, rows }) => {
  // const packagesHandle = Meteor.subscribe('packages');
  // const isLoading = !packagesHandle.ready();

  let query = { status: COMPLETE, submittedBy: Meteor.userId() };

  if (Auth.isAdmin()) {
    delete query.submittedBy;
  }

  const packages = PackagesCollection.find(query).fetch();
  const pages = Math.floor(packages.length / PAGE_SIZE) + 1;
  const page = 1;

  return {
    isLoading: false,
    approval: false,
    page,
    pages,
    summary,
    packages,
  };
})(WithLoading(PackageTable));

export { PackagesContainer };
