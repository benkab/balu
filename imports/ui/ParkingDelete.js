import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setParking, cancelParkingDeleteMode } from './../store/actions/parkingActions';
import './../styles/delete.css';

class ParkingDelete extends TrackerReact(Component) {

  constructor() {
    super();
  }

  cancelDeletion (event){
  	event.preventDefault();
  	this.props.setParking(null);
    this.props.cancelParkingDeleteMode(this.props.isDeletingParking.isDeletingParking);
  }

  deleteParking (event){
    event.preventDefault();
    var id = this.props.parking.parking._id;
    if(id){
      Meteor.call('deleteParking', id, (error)=> {
        if(error){
          console.log(error);
        } else {
          Bert.alert('You have successfully deleted the parking', 'success');
          this.props.cancelParkingDeleteMode(this.props.isDeletingParking.isDeletingParking);
        }
      });
    }
  }

  render() {
  	return (
      <div className="col-sm-12">
        <div className="confirmDeletion">
          <p>Do you want to delete this parking '<b>{this.props.parking.parking.description}</b>'?</p>
          <ul>
            <li onClick={this.deleteParking.bind(this)}>Delete</li>
            <li className="annuler" onClick={this.cancelDeletion.bind(this)}>Cancel</li>
          </ul>
        </div>
      </div>
  	)
  }

}

function mapStateToProps(state) {
  return {
    parking: state.parkingReducer.parking,
    isDeletingParking : state.parkingReducer.isDeletingParking
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    setParking: setParking,
    cancelParkingDeleteMode: cancelParkingDeleteMode
  }, dispatch)
}



export default connect(mapStateToProps, matchDispatchToProps)(ParkingDelete);
