import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import './methods.js';

export const Contacts = new Mongo.Collection('contacts');

Contacts.contactSchema = new SimpleSchema({
  /*userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },*/
  /*createdAt: {
    type: Date,
    autovalue: function autoValue() {
      if (this.isInsert) {
        return new Date();
      }
      this.unset();
      return undefined;
    },
  },*/
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  phone: {
    type: String,
  },
  sentMessages: {
    type: [Object],
    optional: true,
  },
  'sentMessages.$.type': {
    type: String,
    optional: true,
  },
  'sentMessages.$.content': {
    type: String,
    optional: true,
  },
  'sentMessages.$.sentAt': {
    type: Date,
    optional: true,
  },
  'sentMessages.$.subject': {
    type: String,
    optional: true,
  },
});

Contacts.helpers({
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
})
