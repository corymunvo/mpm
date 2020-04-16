import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ApprovalsCollection } from '../../api/approvals.js';
import { PackagesCollection } from '../../api/packages.js';

function createApproval(id, date, name, description, conflicts) {
  return { id, date, name, description, conflicts };
}

function createPackage(
  id,
  submitted,
  name,
  description,
  approvedOn,
  approvedBy,
  status
) {
  return { id, submitted, name, description, approvedBy, approvedOn, status };
}
Meteor.startup(() => {
  if (ApprovalsCollection.find().count() === 0) {
    [
      createApproval(0, '16 Mar, 2019', 'PKG1', 'ABC Campaign', false),
      createApproval(
        1,
        '16 Mar, 2019',
        'OptOut_Webapp',
        'New opt out webapp',
        false
      ),
      createApproval(2, '16 Mar, 2019', 'PKG23', 'New folder structure', true),
      createApproval(
        3,
        '16 Mar, 2019',
        'New_Folders',
        'Folder structure for ZYZ',
        true
      ),
      createApproval(
        4,
        '15 Mar, 2019',
        'PKG4',
        'Personalization block for new deliveries',
        false
      ),
      createApproval(5, '16 Mar, 2019', 'PKG1', 'ABC Campaign', false),
      createApproval(
        6,
        '16 Mar, 2019',
        'OptOut_Webapp',
        'New opt out webapp',
        false
      ),
      createApproval(7, '16 Mar, 2019', 'PKG23', 'New folder structure', true),
      createApproval(
        8,
        '16 Mar, 2019',
        'New_Folders',
        'Folder structure for ZYZ',
        false
      ),
      createApproval(
        9,
        '15 Mar, 2019',
        'PKG4',
        'Personalization block for new deliveries',
        false
      ),
    ].forEach(function (approval) {
      ApprovalsCollection.insert(approval);
    });
  }

  if (PackagesCollection.find().count() === 0) {
    [
      createPackage(
        0,
        '16 Mar, 2019',
        'PKG1',
        'ABC Campaign deployment',
        '16 Mar, 2019',
        'Andy',
        'Success'
      ),
      createPackage(
        1,
        '16 Mar, 2019',
        'OptOut_Webapp',
        'New opt out webapp',
        '16 Mar, 2019',
        'Andy',
        'Success'
      ),
      createPackage(
        2,
        '16 Mar, 2019',
        'PKG23',
        'New folder structure',
        '16 Mar, 2019',
        'Andy',
        'Success'
      ),
      createPackage(
        3,
        '16 Mar, 2019',
        'PKG1',
        'ABC Campaign deployment',
        '16 Mar, 2019',
        'Bill',
        'Success'
      ),
      createPackage(
        4,
        '16 Mar, 2019',
        'OptOut_Webapp',
        'New opt out webapp',
        '16 Mar, 2019',
        'Bill',
        'Success'
      ),
      createPackage(
        5,
        '16 Mar, 2019',
        'PKG23',
        'New folder structure',
        '16 Mar, 2019',
        'Andy',
        'Success'
      ),
      createPackage(
        6,
        '16 Mar, 2019',
        'PKG1',
        'ABC Campaign deployment',
        '16 Mar, 2019',
        'Andy',
        'Success'
      ),
      createPackage(
        7,
        '16 Mar, 2019',
        'OptOut_Webapp',
        'New opt out webapp',
        '16 Mar, 2019',
        'Cory',
        'Success'
      ),
      createPackage(
        8,
        '16 Mar, 2019',
        'PKG23',
        'New folder structure',
        '16 Mar, 2019',
        'Cory',
        'Success'
      ),
      createPackage(
        9,
        '16 Mar, 2019',
        'OptOut_Webapp',
        'New opt out webapp',
        '16 Mar, 2019',
        'Andy',
        'Success'
      ),
    ].forEach(function (pacakge) {
      PackagesCollection.insert(pacakge);
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
