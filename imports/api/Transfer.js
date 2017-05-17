import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

// Transfers
const Transfer = new Mongo.Collection('transfers');

Transfer.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

const TransferSchema = new SimpleSchema({
  sender_firstname: {
  	type: String,
    optional: true
  },
  sender_lastname: {
    type: String,
    optional: true
  },
  sender_telephone: {
    type: String,
    optional: true
  },
  sender_address: {
    type: String,
    optional: true
  },
  receiver_firstname: {
    type: String,
    optional: true
  },
  receiver_lastname: {
    type: String,
    optional: true
  },
  receiver_telephone: {
    type: String,
    optional: true
  },
  receiver_address: {
    type: String,
    optional: true
  },
  amount: {
    type: Number,
    optional: true
  },
  amount_paid: {
    type: Number,
    optional: false
  },
  code: {
    type: String,
    optional: true
  },
  origine_branch: {
    type: String,
    optional: true
  },
  destination_branch: {
    type: String,
    optional: true
  },
  user: {
    type: String,
    optional: true,
    autoValue: function() {
      return Meteor.userId();
    }
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

Transfer.attachSchema(TransferSchema);

export default Transfer;