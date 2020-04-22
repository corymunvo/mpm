import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import SimpleSchema from "simpl-schema";
import { Auth } from "../ui/Auth";

if (Meteor.isServer) {
  Meteor.publish("users", function () {
    if (Auth.isAdmin()) {
      return Meteor.users.find();
    }
    // const query = Meteor.users.createQuery("getUsers", {
    //   username: 1,
    //   groups: {
    //     name: 1,
    //   },
    // });
    // const users = query.fetch();
  });
}

export const createUser = new ValidatedMethod({
  name: "users.createUser",
  validate: new SimpleSchema({
    username: { type: String, min: 3, max: 255 },
    password: { type: String, min: 3, max: 255 },
    isAdmin: { type: Boolean, defaultValue: false },
  }).validator(),
  run({ username, password, isAdmin }) {
    if (!Auth.isAdmin()) {
      throw new Meteor.Error("not-authorized");
    }

    userId = Accounts.createUser({ username: username, password: password });
    Meteor.users.update(userId, {
      $set: {
        isAdmin: isAdmin,
        profile: {
          isAdmin: isAdmin,
        },
      },
    });
  },
});

export const setGroup = new ValidatedMethod({
  name: "users.setGroup",
  validate: new SimpleSchema({
    userId: { type: String },
    groupId: { type: String },
  }).validator(),
  run({ userId, groupId }) {
    if (!Auth.isAdmin()) {
      throw new Meteor.Error("not-authorized");
    }

    console.log("group set");
    Meteor.users.update(userId, {
      $set: {
        groupId: groupId,
      },
    });
  },
});
