import { Meteor } from "meteor/meteor";
import { PackagesCollection } from "../../api/packages.js";
import { withTracker } from "meteor/react-meteor-data";
import { PackageTable } from "../components";
import { PAGE_SIZE, PENDING_APPROVAL } from "../../constants";
import { WithLoading } from "../hocs";

const ApprovalsContainer = withTracker(({ ...rest }) => {
  const packagesHandle = Meteor.subscribe("packages");
  const isLoading = !packagesHandle.ready();
  let query = { status: PENDING_APPROVAL };
  const packages = PackagesCollection.find(query).fetch();
  const pages = Math.floor(packages.length / PAGE_SIZE) + 1;
  const page = 1;

  return {
    isLoading,
    page,
    pages,
    packages,
    ...rest,
  };
})(WithLoading(PackageTable));

export { ApprovalsContainer };
