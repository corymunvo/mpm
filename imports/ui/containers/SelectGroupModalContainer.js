import { GroupsCollection } from '../../api/groups.js';
import { withTracker } from 'meteor/react-meteor-data';
import { SelectGroupModal } from '../components';
import { PAGE_SIZE } from '../../constants';
import { WithLoading } from '../hocs';

const SelectGroupModalContainer = withTracker(
  ({ onClose, selectedValue, open }) => {
    const groups = GroupsCollection.find({}).fetch();
    const pages = Math.floor(groups.length / PAGE_SIZE) + 1;
    const page = 1;

    return {
      onClose,
      selectedValue,
      open,
      isLoading: false,
      page,
      pages,
      groups,
    };
  }
)(WithLoading(SelectGroupModal));

export { SelectGroupModalContainer };
