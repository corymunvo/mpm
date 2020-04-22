import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { UserTable } from "../components";
import { PAGE_SIZE } from "../../constants";
import { WithLoading } from "../hocs";

const UsersContainer = withTracker(({ summary, handleClickOpen }) => {
  let groupsHandle = Meteor.subscribe("groups");
  let usersHandle = Meteor.subscribe("users");

  const users = Meteor.users.find().fetch();
  const pages = Math.floor(users.length / PAGE_SIZE) + 1;
  const page = 1;

  return {
    // isLoading: !usersHandle.ready(),
    isLoading: false,
    page,
    pages,
    users,
    summary,
    handleClickOpen,
  };
})(WithLoading(UserTable));

export { UsersContainer };
