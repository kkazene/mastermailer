import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Contacts } from '../imports/api/contacts/contacts.js';
import 'meteor/chrismbeckett:toastr'; /* global toastr */

import './main.html';

Template.addContact.events({
  'click #addCntct': function (e) {
    const newContact = {};
    newContact.firstName = $('#fname').val();
    newContact.lastName = $('#lname').val();
    newContact.email = $('#email').val();
    newContact.phone = $('#phone').val();
    if (newContact.firstName && newContact.lastName && newContact.email && newContact.phone) {
      Meteor.call('Contacts.insert', newContact, (err) => {
        if (err) {
          console.log(err);
          toastr.error(err.message);
        } else {
          toastr.success('Added new contact!');
          // Reset form
          $('#fname').val('');
          $('#lname').val('');
          $('#email').val('');
          $('#phone').val('');
        }
      });
    } else {
      toastr.error('Please fill in all the fields!');
    }
  }
});

Template.contactTable.helpers({
  contacts() {
    return Contacts.find();
  },

  tableSettings() {
    const fields = [
      { fieldId: 'lastName', key: 'lastName', label: 'Last name', sortByValue: true },
      { fieldId: 'firstName', key: 'firstName', label: 'First name' },
      { fieldId: 'email', key: 'email', label: 'Email' },
      { fieldId: 'phone', key: 'phone', label: 'Phone' },
    ];

    return {
      rowsPerPage: 50,
      fields,
    };
  }
});
