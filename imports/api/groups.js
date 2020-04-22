import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import SimpleSchema from "simpl-schema";
import { Auth } from "../ui/Auth";
import { DEPLOYMENT_VALUES } from "../constants";

export const GroupsCollection = new Mongo.Collection("groups");

if (Meteor.isServer) {
  Meteor.publish("groups", function () {
    return GroupsCollection.find();
  });
}

const rightsSchema = new SimpleSchema({
  schemas: { type: Boolean },
  forms: { type: Boolean },
  webforms: { type: Boolean },
  users: { type: Boolean },
  accessRights: { type: Boolean },
  operatorGroups: { type: Boolean },
  typologies: { type: Boolean },
  folders: { type: Boolean },
  campaigns: { type: Boolean },
  workflows: { type: Boolean },
  personalizationBlocks: { type: Boolean },
  deliveries: { type: Boolean },
});

export const groupSchema = new SimpleSchema({
  name: {
    type: String,
    min: 3,
    max: 255,
  },
  rights: {
    type: rightsSchema,
  },
  autodeploy: { type: Boolean },
  autodeployFreq: {
    type: String,
    allowedValues: DEPLOYMENT_VALUES,
  },
  autodeployTime: { type: Date },
});

export const createGroup = new ValidatedMethod({
  name: "groups.createGroup",
  validate: groupSchema.validator(),
  run(group) {
    if (!Auth.isAdmin()) {
      throw new Meteor.Error(
        "groups.createGroup.unauthorized",
        "not-authorized"
      );
    }

    GroupsCollection.insert(group);
  },
});

export const updateGroup = new ValidatedMethod({
  name: "groups.updateGroup",
  validate: new SimpleSchema({
    id: { type: String },
    group: { type: groupSchema },
  }).validator(),
  run({ id, group }) {
    if (!Auth.isAdmin()) {
      throw new Meteor.Error(
        "groups.updateGroup.unauthorized",
        "not-authorized"
      );
    }

    GroupsCollection.update(id, {
      $set: { ...group },
    });
  },
});
