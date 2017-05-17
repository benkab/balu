import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import User from './../imports/api/User';
import Branch from './../imports/api/Branch';

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
    const createdUser = Accounts.createUser({
      email: user.email,
      profile: {
        firstname: user.firstname,
        lastname: user.lastname,
        telephone: user.telephone,
        isAdmin: false,
        branch: user.branch
      }
    });
    Accounts.setPassword(createdUser, JSON.stringify(user.password));
  },
  updateUser(user) {
    User.update(user.id, {
      $set: {
        'profile.isAdmin': user.isAdmin,
        'profile.branch': user.branch
      }
    });
  },
  deleteUser(id) {
    User.remove(id);
  }
});
