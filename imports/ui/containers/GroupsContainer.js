import { Meteor } from "meteor/meteor";
import { GroupsCollection } from "../../api/groups.js";
import { withTracker } from "meteor/react-meteor-data";
import { GroupTable } from "../components";
import { PAGE_SIZE } from "../../constants";
import { WithLoading } from "../hocs";

const GroupsContainer = withTracker(({ summary }) => {
  const groupsHandle = Meteor.subscribe("groups");
  const isLoading = !groupsHandle.ready();
  const groups = GroupsCollection.find({}).fetch();
  const pages = Math.floor(groups.length / PAGE_SIZE) + 1;
  const page = 1;

  return {
    isLoading,
    page,
    pages,
    groups,
    summary,
  };
})(WithLoading(GroupTable));

export { GroupsContainer };
