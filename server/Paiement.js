import Paiement from './../imports/api/Paiement';

// Paiements
Meteor.publish('paiements', function() {
  return Paiement.find({}, {sort: {createdAt: -1}});
});
