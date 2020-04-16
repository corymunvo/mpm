import { Meteor } from 'meteor/meteor';
import { ApprovalsCollection } from '../../api/approvals.js';
import { withTracker } from 'meteor/react-meteor-data';
import { ApprovalTable } from '../components';
import { PAGE_SIZE } from '../constants';
import { WithLoading } from '../hocs';

const ApprovalsContainer = withTracker(({ summary }) => {
  const approvals = ApprovalsCollection.find({}).fetch();
  const pages = Math.floor(approvals.length / PAGE_SIZE) + 1;
  const page = 1;

  return {
    isLoading: false,
    page,
    pages,
    approvals,
    summary,
  };
})(WithLoading(ApprovalTable));

export { ApprovalsContainer };
