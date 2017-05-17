import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Branch = new Mongo.Collection('branches');

Branch.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

const BranchSchema = new SimpleSchema({
  description: {
  	type: String
  },
  createdAt: {
  	type: Date,
  	optional: true,
  	autoValue: function() {
      if ( this.isInsert ) {
        return new Date;
      } 
    }
  },
  updatedAt: {
  	type: Date,
  	optional: true,
  	autoValue: function() {
      if ( this.isUpdate ) {
        return new Date;
      } 
    }
  }
});

Branch.attachSchema(BranchSchema);

export default Branch;
