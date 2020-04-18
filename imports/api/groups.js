import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const GroupsCollection = new Mongo.Collection('groups');
