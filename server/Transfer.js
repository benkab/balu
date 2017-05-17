import Transfer from './../imports/api/Transfer';
import User from './../imports/api/User';
import Branch from './../imports/api/Branch';
import Paiement from './../imports/api/Paiement';

// Transfers
Meteor.publish('transfers', function() {
  return Transfer.find({}, {sort: {createdAt: -1}});
});

// Methods
Meteor.methods({
  addTransfer(transfer) {
    const branch = Branch.findOne({_id: transfer.branch});
    const truncateTerm = branch.description.substring(0, 3);
    const codePrefix = truncateTerm.toUpperCase();
    const middlewareCodeCombinaison = codePrefix + '-';
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const code = middlewareCodeCombinaison + randomNumber;

    const branchId = Meteor.user().profile.branch;

    Transfer.insert({
      sender_firstname: transfer.sender_firstname,
      sender_lastname: transfer.sender_lastname,
      sender_telephone: transfer.sender_telephone,
      sender_address: transfer.sender_address,
      receiver_firstname: transfer.receiver_firstname,
      receiver_lastname: transfer.receiver_lastname,
      receiver_telephone: transfer.receiver_telephone,
      receiver_address: transfer.receiver_address,
      amount: transfer.amount,
      amount_paid: 0,
      code: code,
      origine_branch: branchId,
      destination_branch: transfer.branch
    });

    const addedTransfer = Transfer.findOne({code: code});

    // Retrieve transfer
    Paiement.insert({
      type: 'Transfert',
      amount: 0,
      code: code,
      item: addedTransfer._id
    });

    // const addedTransfer = Transfer.findOne({code: code});

    // Notification.insert({
    //   type: 'Transfer',
    //   item: addedTransfer._id,
    //   read: false
    // });

    Streamy.broadcast('notify', { data: transfer.branch });
    
  },
  updateTransfer(transfer) {
    Transfer.update(transfer.id, {
      $set: {
        sender_firstname: transfer.sender_firstname,
        sender_lastname: transfer.sender_lastname,
        sender_telephone: transfer.sender_telephone,
        sender_address: transfer.sender_address,
        receiver_firstname: transfer.receiver_firstname,
        receiver_lastname: transfer.receiver_lastname,
        receiver_telephone: transfer.receiver_telephone,
        receiver_address: transfer.receiver_address,
        amount: transfer.amount,
        destination_branch: transfer.branch
      }
    });
  },
  deleteTransfer(id) {
    Transfer.remove(id);
  },
  payTransfer(transfer) {
    Transfer.update(transfer.id, {
      $set: {
        amount_paid: transfer.amount_paid
      }
    });

    // Retrieve transfer
    Paiement.insert({
      type: 'Transfert',
      amount: transfer.paiement,
      code: transfer.code,
      item: transfer.id
    });
  }
});