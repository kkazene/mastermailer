import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
//import { Roles } from 'meteor/alanning:roles';

import { Contacts } from '../contacts.js';

// Publish contacts added by the user
Meteor.publish('Contacts.own', function () {
  if (this.userId) {
    return Contacts.find({ userId: this.userId });
  }
  return this.ready();
});
// Publish contacts added by anyone
Meteor.publish('Contacts.all', function () {
//  if (this.userId && Roles.userIsInRole(this.userId, ['admin'])) {
    return Contacts.find();
  //}
  return this.ready();
});
