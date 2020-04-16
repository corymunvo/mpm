import { Meteor } from 'meteor/meteor';

const Auth = {
  isAuthenticated() {
    return Meteor.userId() !== null;
  },

  signin(username, password, cb) {
    Meteor.loginWithPassword(username, password, (err) => {
      if (err) {
        console.log(err);
        cb(false);
      } else {
        cb(true);
      }
    });
  },

  signout(cb) {
    Meteor.logout((err) => {
      if (!err) {
        cb();
      }
    });
  },

  isAdmin() {
    return (
      Meteor.user() && Meteor.user().profile && Meteor.user().profile.isAdmin
    );
  },
};

export { Auth };
