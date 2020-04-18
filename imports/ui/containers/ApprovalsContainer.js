import { Meteor } from 'meteor/meteor';
import { PackagesCollection } from '../../api/packages.js';
import { withTracker } from 'meteor/react-meteor-data';
import { PackageTable } from '../components';
import { PAGE_SIZE, PENDING_APPROVAL } from '../constants';
import { WithLoading } from '../hocs';

const ApprovalsContainer = withTracker(({ summary }) => {
  let query = { status: PENDING_APPROVAL };

  const packages = PackagesCollection.find(query).fetch();
  const pages = Math.floor(packages.length / PAGE_SIZE) + 1;
  const page = 1;

  return {
    isLoading: false,
    approval: true,
    page,
    pages,
    packages,
    summary,
  };
})(WithLoading(PackageTable));

export { ApprovalsContainer };
