import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Notification from './../imports/api/Notification';

// Notifications
Meteor.publish('notifications', function() {
  if(this.userId){
  	const notifications = Notification.find(
  		{
  		  read: false
  		}, 
  		{
  		  sort: 
  			{
  		      createdAt: -1
  		    }
  		}
    );

    return notifications;
  }
  
});
