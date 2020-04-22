import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { PackagesCollection } from '../../api/packages.js';
import { COMPLETE, PENDING_APPROVAL } from '../../constants';

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
    submittedOn: Date.parse(submittedOn),
    submittedBy,
    approvedOn: Date.parse(approvedOn),
    approvedBy,
    conflicts,
    status,
  };
}
Meteor.startup(() => {
  if (!Meteor.users.find().count()) {
    let userId = Accounts.createUser({
      username: 'admin',
      password: 'admin',
      isAdmin: true,
      profile: {
        isAdmin: true,
      },
    });

    [
      createPackage(
        0,
        'PKG1',
        'ABC Campaign',
        userId,
        '16 Mar, 2019',
        userId,
        '16 Mar, 2019',
        false,
        COMPLETE
      ),
      createPackage(
        1,
        'PKG1',
        'ABC Campaign',
        userId,
        '16 Mar, 2019',
        userId,
        '16 Mar, 2019',
        false,
        COMPLETE
      ),
      createPackage(
        2,
        'PKG1',
        'ABC Campaign',
        userId,
        '16 Mar, 2019',
        userId,
        '16 Mar, 2019',
        false,
        COMPLETE
      ),
      createPackage(
        3,
        'PKG1',
        'ABC Campaign',
        userId,
        '16 Mar, 2019',
        userId,
        '16 Mar, 2019',
        false,
        PENDING_APPROVAL
      ),
      createPackage(
        4,
        'PKG1',
        'ABC Campaign',
        userId,
        '16 Mar, 2019',
        userId,
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
});
