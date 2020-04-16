import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { UserTable } from '../components';
import { PAGE_SIZE } from '../constants';
import { WithLoading } from '../hocs';

const UsersContainer = withTracker(({ summary, handleClickOpen }) => {
  // const users = Meteor.users.find({}).fetch();
  // console.log(users
  const users = Meteor.users.find().fetch();
  const pages = Math.floor(users.length / PAGE_SIZE) + 1;
  const page = 1;

  return {
    isLoading: false,
    page,
    pages,
    users,
    summary,
    handleClickOpen,
  };
})(WithLoading(UserTable));

export { UsersContainer };
