import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';
import User from './../imports/api/User';

// Publications
Meteor.publish('users', function() {
  if(!this.userId) {
    this.stop();
  }

  const users =  User.find({}, {sort: {createdAt: -1}});

  return users;
});

// Methods
Meteor.methods({
  addUser(user) {
    if(user.isAdmin === "true"){
      const createdUser = Accounts.createUser({
        email: user.email,
        profile: {
          firstname: user.firstname,
          lastname: user.lastname,
          telephone: user.telephone,
          isAdmin: true
        }
      });
      Accounts.setPassword(createdUser, JSON.stringify(user.password));
    } else if (user.isAdmin === "false"){
      const createdUser = Accounts.createUser({
        email: user.email,
        profile: {
          firstname: user.firstname,
          lastname: user.lastname,
          telephone: user.telephone,
          isAdmin: false
        }
      });
      Accounts.setPassword(createdUser, JSON.stringify(user.password));
    }
  },
  updateUser(user) {
    if(user.isAdmin === "true"){
      User.update(user.id, {
        $set: {
          'profile.isAdmin': true
        }
      });
    } else if (user.isAdmin === "false"){
      User.update(user.id, {
        $set: {
          'profile.isAdmin': false
        }
      });
    }
    
  },
  deleteUser(id) {
    User.remove(id);
  },
  updateProfle(user){
    User.update(Meteor.userId(), {
      $set: {
        'profile.firstname': user.firstname,
        'profile.lastname': user.lastname,
        'profile.telephone': user.telephone
      }
    });
    if(Meteor.user().emails[0].address !== user.email){
      Meteor.users.update(Meteor.userId(), { 
         $set: { 
          'emails.0.address': user.email 
         }
      });
    }
  },
  updatePassword(password){
    const new_password = JSON.stringify(password);
    Accounts.setPassword(Meteor.userId(), new_password)
  }
});
