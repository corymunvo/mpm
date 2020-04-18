import '/imports/startup/server';
import { Meteor } from 'meteor/meteor';

import '../imports/api/files.js';
import '../imports/api/users.js';
import '../imports/api/groups.js';
import '../imports/api/packages.js';
import '../imports/api/settings.js';
import '../imports/api/links.js';

Meteor.startup(() => {
  // Meteor.users.deny({
  //   update() {
  //     return true;
  //   },
  // });
  // Meteor.users._transform = function (user) {
  //   return new User(user)
  // };
  // Meteor.user =  () => {
  //   Meteor.user
  // }
});
