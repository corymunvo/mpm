import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Auth } from '../ui/Auth';

Meteor.methods({
  'user.setGroup'(userId, group) {
    check(userId, String);
    check(group, Object);

    if (!Auth.isAdmin()) {
      throw new Meteor.Error('not-authorized');
    }

    Meteor.users.update(userId, {
      $set: {
        profile: {
          group: group,
        },
      },
    });
  },

  'user.createUser'(username, password, isAdmin) {
    check(username, String);
    check(password, String);
    check(isAdmin, Boolean);

    if (!Auth.isAdmin()) {
      throw new Meteor.Error('not-authorized');
    }

    userId = Accounts.createUser({ username: username, password: password });
    Meteor.users.update(userId, {
      $set: {
        profile: {
          isAdmin: isAdmin,
        },
      },
    });
  },
});