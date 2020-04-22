import "/imports/startup/server";
import { Meteor } from "meteor/meteor";

import "../imports/api/files.js";
import "../imports/api/users.js";
import "../imports/api/groups.js";
import "../imports/api/packages.js";
import "../imports/api/settings.js";

Meteor.startup(() => {
  Meteor.users.deny({
    update() {
      return true;
    },
  });
});
