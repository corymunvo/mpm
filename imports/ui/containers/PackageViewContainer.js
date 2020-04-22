import { Meteor } from "meteor/meteor";
import { PackagesCollection } from "../../api/packages.js";
import { withTracker } from "meteor/react-meteor-data";
import { PackageView } from "../components";
import { WithLoading } from "../hocs";

const PackageViewContainer = withTracker(({ id, ...rest }) => {
  const packagesHandle = Meteor.subscribe("packages");
  const isLoading = !packagesHandle.ready();

  const query = { _id: id };
  const package = PackagesCollection.findOne(query);

  return {
    isLoading,
    package,
    ...rest,
  };
})(WithLoading(PackageView));

export { PackageViewContainer };
