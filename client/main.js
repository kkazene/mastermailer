import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Contacts } from '../imports/api/contacts/contacts.js';
import { Session } from 'meteor/session';
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

Template.contactTable.onCreated(function () {
  Meteor.subscribe('Contacts.own');
  Session.set('checkedContacts', []);
});

Template.contactTable.helpers({
  contacts() {
    return Contacts.find();
  },

  tableSettings() {
    const fields = [
      {
        fieldId: 'checked',
        key: 'checked',
        label() {
          return new Spacebars.SafeString("<input type='checkbox' />");
        },
        fn(value, object) {
          return new Spacebars.SafeString("<input type='checkbox' />");
        }
      },
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

Template.contactTable.events({
  'click .reactive-table tbody tr': function (event) {
    // event.preventDefault();
    const row = this;
    let cntctArr = Session.get('checkedContacts');
    if (event && event.target.type === 'checkbox') {
      if (event.target.checked) {
        cntctArr.push(row._id);
      } else {
        cntctArr.splice(cntctArr.indexOf(row._id), 1);
      }
      Session.set('checkedContacts', cntctArr);
    }
  }
});
