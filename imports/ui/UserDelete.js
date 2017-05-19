import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUser, cancelUserDeleteMode } from './../store/actions/userActions';

class UserDelete extends TrackerReact(Component) {

  constructor() {
    super();
  }

  cancelDeletion (event){
  	event.preventDefault();
  	this.props.setUser(null);
    this.props.cancelUserDeleteMode(null)
  }

  deleteUser (event){
    event.preventDefault();
    var id = this.props.selectedUser.user._id;
    if(id){
      Meteor.call('deleteUser', id, (error)=> {
        if(error){
          console.log(error);
        } else {
          this.props.setUser(null);
          this.props.cancelUserDeleteMode(null);
          Bert.alert('Cet agent a été supprimé', 'success');
        }
      });
    }
  }

  render() {
  	return (
      <div>
      {
        (this.props.selectedUser && this.props.isDeleting.isDeleting) && 
        <div className="confirmDeletion">
          <p>Confirmez vous la suppression de cet agent?</p>
          <ul>
            <li onClick={this.deleteUser.bind(this)}>Supprimer</li>
            <li className="annuler" onClick={this.cancelDeletion.bind(this)}>Annuler</li>
          </ul>
        </div>
      }
      </div>
  	)
  }

}

function mapStateToProps(state) {
  return {
    isDeleting : state.userReducer.isDeleting,
    selectedUser :state.userReducer.user
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    setUser: setUser,
    cancelUserDeleteMode: cancelUserDeleteMode
  }, dispatch)
}



export default connect(mapStateToProps, matchDispatchToProps)(UserDelete);
