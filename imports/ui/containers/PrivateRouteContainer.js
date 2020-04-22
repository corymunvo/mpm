import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { PrivateRoute } from '../components';
import { WithLoading } from '../hocs';

const PrivateRouteContainer = withTracker(({ ...rest }) => {
  const isLoading = !Meteor.user() && Meteor.loggingIn();
  const user = Meteor.user() ? Meteor.user() : {};

  return {
    isLoading,
    user,
    ...rest,
  };
})(WithLoading(PrivateRoute));

export { PrivateRouteContainer };
