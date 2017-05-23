import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

// Parkings
const Parking = new Mongo.Collection('parkings');

Parking.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

const ParkingSchema = new SimpleSchema({
  description: {
    type: String,
    optional: true
  },
  latitude: {
  	type: String,
    optional: true
  },
  longitude: {
    type: String,
    optional: true
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

Parking.attachSchema(ParkingSchema);

export default Parking;
