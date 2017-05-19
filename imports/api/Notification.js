import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

// Notifications
const Notification = new Mongo.Collection('notifications');

Notification.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

const NotificationSchema = new SimpleSchema({
  type: {
    type: String,
    optional: false
  },
  item: {
    type: String,
    optional: false
  },
  branch: {
    type: String,
    optional: false
  },
  read: {
    type: Boolean,
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

Notification.attachSchema(NotificationSchema);

export default Notification;