import { Meteor } from 'meteor/meteor';
import { GroupsCollection } from './groups';

Meteor.users.addLinks({
  group: {
    type: 'one',
    field: '_id',
    collection: GroupsCollection,
  },
});

GroupsCollection.addLinks({
  users: {
    collection: Meteor.users,
    inversedBy: 'group',
  },
});
