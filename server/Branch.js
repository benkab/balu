import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Branch from './../imports/api/Branch';

// Publications
Meteor.publish('branches', function() {
	return Branch.find({}, {sort: {createdAt: -1}});
});

// Methods
Meteor.methods({
  addBranch(description) {
    const checkBranch = Branch.findOne({description: 
      { $regex: new RegExp("^" + description.toLowerCase(), "i") }
    });
    if(checkBranch){
      return 'Existing';
    } else {
      Branch.insert({
        description: description
      });
    }
  },
  deleteBranch(id) {
  	Branch.remove(id);
  },
  updateBranch(branch) {
  	Branch.update(branch.id, {
  	  	$set: {
  	  		description: branch.description
  	  	}
  	  }
  	);
  }
});
