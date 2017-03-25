import { Meteor } from 'meteor/meteor';
import { Contacts } from './contacts.js';
import { check, Match } from 'meteor/check';

Meteor.methods({
  'Contacts.insert'(cntct) {
    check(cntct, {
      //userId: String,
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
    });
    if (cntct) {
      const id = Contacts.insert({
        //userId: cntct.userId,
        firstName: cntct.firstName,
        lastName: cntct.lastName,
        //createdAt: new Date(),
        email: cntct.email,
        phone: cntct.phone,
        sentMessages: [],
      });
    }
  },
  'Contacts.addSentMessage'(id, type, subject, content) {
    check(id, String);
    check(type, String);
    check(subject, String);
    check(content, String);
    const user = Meteor.users.findOne(from);

    Contacts.update(id,
      { $push: { sentMessages: { type, subject, content, sentAt: new Date() } } }
    );
  },
});
