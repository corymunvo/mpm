import { Meteor } from 'meteor/meteor';
import { PackagesCollection } from '../../api/packages.js';
import { withTracker } from 'meteor/react-meteor-data';
import { ApprovalTable } from '../components';
import { PAGE_SIZE, PENDING_APPROVAL } from '../constants';
import { WithLoading } from '../hocs';

const ApprovalsContainer = withTracker(({ summary }) => {
  const packages = PackagesCollection.find({
    status: PENDING_APPROVAL,
  }).fetch();
  const pages = Math.floor(packages.length / PAGE_SIZE) + 1;
  const page = 1;

  return {
    isLoading: false,
    page,
    pages,
    packages,
    summary,
  };
})(WithLoading(ApprovalTable));

export { ApprovalsContainer };
