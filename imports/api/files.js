import { FilesCollection } from "meteor/ostrio:files";

// import { Mongo } from 'meteor/mongo';
// export const FilesCollection = new Mongo.Collection('files');

export const Files = new FilesCollection({ collectionName: "files" });
// optionally attach a schema
// Files.attachSchema(FilesCollection.schema);

// Example: Publish:
if (Meteor.isServer) {
  Meteor.publish("files.all", function () {
    return Files.collection.find({ userId: Meteor.userId() });
  });
}
