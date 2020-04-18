import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { PackagesCollection } from '../../api/packages.js';
import { COMPLETE, PENDING_APPROVAL } from '../../ui/constants';

function createPackage(
  id,
  name,
  description,
  submittedBy,
  submittedOn,
  approvedBy,
  approvedOn,
  conflicts,
  status
) {
  return {
    id,
    name,
    description,
    submittedOn,
    submittedBy,
    approvedOn,
    approvedBy,
    conflicts,
    status,
  };
}
Meteor.startup(() => {
  if (PackagesCollection.find().count() === 0) {
    [
      createPackage(
        0,
        'PKG1',
        'ABC Campaign',
        'Admin',
        '16 Mar, 2019',
        'Admin',
        '16 Mar, 2019',
        false,
        COMPLETE
      ),
      createPackage(
        1,
        'PKG1',
        'ABC Campaign',
        'Admin',
        '16 Mar, 2019',
        'Admin',
        '16 Mar, 2019',
        false,
        COMPLETE
      ),
      createPackage(
        2,
        'PKG1',
        'ABC Campaign',
        'Admin',
        '16 Mar, 2019',
        'Admin',
        '16 Mar, 2019',
        false,
        COMPLETE
      ),
      createPackage(
        3,
        'PKG1',
        'ABC Campaign',
        'Admin',
        '16 Mar, 2019',
        'Admin',
        '16 Mar, 2019',
        false,
        PENDING_APPROVAL
      ),
      createPackage(
        4,
        'PKG1',
        'ABC Campaign',
        'Admin',
        '16 Mar, 2019',
        'Admin',
        '16 Mar, 2019',
        [
          { id: 1, type: 'Schema', name: 'nms:broadLogRcp' },
          { id: 2, type: 'Campaign', name: 'WKF13' },
        ],
        PENDING_APPROVAL
      ),
    ].forEach(function (package) {
      PackagesCollection.insert(package);
    });
  }
  if (!Meteor.users.find().count()) {
    Accounts.createUser({
      username: 'admin',
      password: 'admin',
      isAdmin: true,
      profile: {
        isAdmin: true,
      },
    });
  }
});
