import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { Auth } from "../ui/Auth";
import SimpleSchema from "simpl-schema";
import { COMPLETE, PENDING_APPROVAL } from "../constants";

export const PackagesCollection = new Mongo.Collection("packages");

if (Meteor.isServer) {
  Meteor.publish("packages", function () {
    if (Auth.isAdmin()) {
      return PackagesCollection.find({});
    } else {
      return PackagesCollection.find({ submittedBy: Meteor.userId() });
    }
  });
}

export const approvePackage = new ValidatedMethod({
  name: "package.approve",
  validate: new SimpleSchema({
    packageId: { type: String },
  }).validator(),
  run({ packageId }) {
    if (!Auth.isAdmin()) {
      throw new Meteor.Error("not-authorized");
    }

    PackagesCollection.update(packageId, {
      $set: {
        status: COMPLETE,
        approvedBy: Meteor.userId(),
        approvedOn: new Date(),
      },
    });
  },
});

export const createPackage = new ValidatedMethod({
  name: "package.createPackage",
  validate: new SimpleSchema({
    name: { type: String, min: 3, max: 255 },
    description: { type: String, min: 3, max: 255 },
    fileId: { type: String, min: 1 },
  }).validator(),
  run({ name, description, fileId }) {
    if (!Auth.isAuthenticated()) {
      throw new Meteor.Error(
        "groups.createGroup.unauthorized",
        "not-authorized"
      );
    }

    const package = {
      name,
      description,
      fileId: fileId,
      submittedBy: Meteor.userId(),
      submittedOn: new Date(),
      conflicts: false,
      status: PENDING_APPROVAL,
    };

    PackagesCollection.insert(package);
  },
});
