import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import Icon from 'react-ionicons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
  setParking,
  toggleParkingEditMode,
  toggleParkingDeleteMode
} from './../store/actions/parkingActions';

class ParkingItem extends Component {

  constructor() {
    super();
  }

  editParking(event){
    event.preventDefault();
    this.props.setParking(this.props.parking);
    this.props.toggleParkingEditMode(this.props.isEditingParking);
  }

  deleteParking(event) {
    event.preventDefault();
    this.props.setParking(this.props.parking);
    this.props.toggleParkingDeleteMode(this.props.isEditingParking);
  }

  render(props) {
  	return (
      <div>
          <div className="table-item row">
            <div className="col-lg-4 col-md-4 col-sm-4">
              <span>{this.props.parking.description}</span>
            </div>            
            <div className="col-lg-3 col-md-3 col-sm-4">
              <span>{this.props.parking.latitude}</span>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-2">
              <span>{this.props.parking.longitude}</span>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-12 table-actions">
              <ul>
                <li 
                  className="transferActionItem"
                  onClick={this.editParking.bind(this)}
                  >
                  <a 
                    data-toggle="tooltip" 
                    data-placement="top" 
                    title="Modifier">
                    <Icon icon="ion-edit" fontSize="14px"  className="transferIcon" color="#616161"/>
                    <span>Edit</span>
                  </a>
                </li>
                <li 
                  className="transferActionItem"
                  onClick={this.deleteParking.bind(this)}
                  >
                  <a 
                    data-toggle="tooltip" 
                    data-placement="top" 
                    title="Supprimer">
                    <Icon icon="ion-trash-b" fontSize="14px" className="transferIcon" color="#616161" />
                    <span>Delete</span>
                  </a>
                </li>
              </ul>
            </div>
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

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    setParking: setParking,
    toggleParkingDeleteMode: toggleParkingDeleteMode,
    toggleParkingEditMode: toggleParkingEditMode
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ParkingItem);
