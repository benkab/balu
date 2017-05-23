import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

Meteor.users.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

export default Meteor.users;
