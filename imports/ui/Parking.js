import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link, browserHistory } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Header from './Header';
import ParkingList from './ParkingList';
import ParkingInput from './ParkingInput';
import ParkingUpdate from './ParkingUpdate';
import ParkingDelete from './ParkingDelete';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Parking extends TrackerReact(Component) {

  constructor() {
    super();
    this.state = {
      subscription : {
        parkings : Meteor.subscribe('parkings')
      }
    }
  }

  componentWillUnmount() {
    this._renderComputation.stop();
    Meteor.subscribe('parkings').stop();
  }

  getCurrentLocation(event){
    event.preventDefault();
  }

  render() {
  	return (
      <div>
        <Header />
        <div className="row home">
          <div className="col-sm-12">
            <p className="home-title">
              Parkings
              {
                (!this.props.isDeletingParking.isDeletingParking) &&
                <a 
                  className="pull-right create-section-button" 
                  onClick={this.getCurrentLocation.bind(this)}>Get current location</a>
              }
            </p>
            <p className="home-branch-title-line"></p>
          </div>
          {
            this.props.isDeletingParking.isDeletingParking &&
            <ParkingDelete />
          }
          {
            (!this.props.isEditingParking.isEditingParking 
              && !this.props.isDeletingParking.isDeletingParking) &&
            <ParkingInput />
          }
          {
            (this.props.isEditingParking.isEditingParking
              && !this.props.isDeletingParking.isDeletingParking) &&
            <ParkingUpdate />
          }
          {
            (!this.props.isEditingParking.isEditingParking) &&
            <div className="col-sm-12">
              <div className="panel panel-default section-panel">
                <div className="panel-heading second-heading">
                  All parkings
                </div>
                <ParkingList />
              </div>
            </div>
          }
        </div>
      </div>
  	)
  }
}

function mapStateToProps(state) {
  return {
    isEditingParking : state.parkingReducer.isEditingParking,
    isDeletingParking: state.parkingReducer.isDeletingParking
  }
}

export default connect(mapStateToProps)(Parking);
