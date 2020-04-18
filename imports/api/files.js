import { FilesCollection } from 'meteor/ostrio:files';

// import { Mongo } from 'meteor/mongo';
// export const FilesCollection = new Mongo.Collection('files');

export const Files = new FilesCollection({ collectionName: 'files' });
// optionally attach a schema
// Files.attachSchema(FilesCollection.schema);

// Example: Publish:
if (Meteor.isServer) {
  Meteor.publish('files.all', function () {
    return Files.collection.find({});
  });
}

//   // Publish only necessary fields:
//   // See issue #316
//   if (Meteor.isServer) {
//     Meteor.publish('files.all', function () {
//       return Images.collection.find({}, {
//         fields: {
//           extension: 1,
//           _downloadRoute: 1,
//           _collectionName: 1,
//           'versions.versionName.extension': 1 // <-- Required only for file's version .link(version), and if extension is different from original file
//         }
//       });
//     });
//   }
