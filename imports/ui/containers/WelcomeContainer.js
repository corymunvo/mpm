import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Welcome } from '../components';
import { WithLoading } from '../hocs';

const WelcomeContainer = withTracker(() => {
  const isLoading = !Meteor.user() || Meteor.loggingIn();
  const username = Meteor.user() ? Meteor.user().username : '';

  return {
    isLoading,
    username,
  };
})(WithLoading(Welcome));

export { WelcomeContainer };
