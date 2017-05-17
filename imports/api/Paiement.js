import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

// Payements
const Paiement = new Mongo.Collection('paiements');

Paiement.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

const PayementSchema = new SimpleSchema({
  type: {
    type: String,
    optional: false
  },
  item: {
    type: String,
    optional: false
  },
  code: {
    type: String,
    optional: false
  },
  amount: {
    type: Number,
    optional: false
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

Paiement.attachSchema(PayementSchema);

export default Paiement;