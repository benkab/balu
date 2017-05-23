import Parking from './../imports/api/Parking';

// Parkings
Meteor.publish('parkings', function() {
  return Parking.find({}, {sort: {createdAt: -1}});
});

// Methods
Meteor.methods({
   
  addParking(parking) {
    const checkParking = Parking.findOne({description: 
      { $regex: new RegExp("^" + parking.description.toLowerCase(), "i") }
    });
    if(checkParking){
      return 'Existing';
    } else {
      Parking.insert({
        description: parking.description,
        latitude: parking.latitude,
        longitude: parking.longitude
      });  
    }
  },
  updateParking(parking) {
    Parking.update(parking.id, {
      $set: {
        description: parking.description,
        latitude: parking.latitude,
        longitude: parking.longitude
      }
    });
  },
  deleteParking(id) {
    Parking.remove(id);
  }
});
