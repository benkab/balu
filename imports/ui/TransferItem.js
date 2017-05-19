import React, { Component } from 'react';
import Moment from 'react-moment';
import { render } from 'react-dom';
import { Link, browserHistory } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Icon from 'react-ionicons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Branches from './../api/Branch';
import Users from './../api/User';
import { 
  setTransfer,
  toggleTransferEditMode,
  toggleTransferDeleteMode,
  toggleTransferPayementMode
} from './../store/actions/transferActions';

class TransferItem extends TrackerReact(Component) {

  constructor() {
    super();
    this.state = {
      origin_branch: null,
      destination_branch: null,
      subscription : {
        users : Meteor.subscribe('users')
      }
    }
  }

  componentWillUnmount() {
    Meteor.subscribe('users').stop();
  }

  retrieveOriginBranch(){
    const singleBranch = Branches.findOne({_id: this.props.transfer.origine_branch});
    this.setState({origin_branch: singleBranch.description});
  }

  retrieveDesinationBranch(){
    const singleBranch = Branches.findOne({_id: this.props.transfer.destination_branch});
    this.setState({destination_branch: singleBranch.description});
  }

  navigateToPay(event){
    event.preventDefault();
    this.props.setTransfer(this.props.transfer);
    this.props.toggleTransferPayementMode(this.props.isPayingTransfer);
  }

  navigateToEdit(event){
    event.preventDefault();
    this.props.setTransfer(this.props.transfer);
    this.props.toggleTransferEditMode(this.props.isEditingTransfer);
  }

  transferDelete(event){
    event.preventDefault();
    this.props.setTransfer(this.props.transfer);
    this.props.toggleTransferDeleteMode(this.props.isEditingTransfer);
  }

  render(props) {
  	return (
      <div>
        {
          (((this.props.transfer.destination_branch === Meteor.user().profile.branch)
                     || Meteor.user().profile.isAdmin === true )
          && (this.props.transfer.amount !== this.props.transfer.amount_paid)) &&
          <div className="table-item row">
            <div className="col-lg-4 col-md-4 col-sm-4">
              <b>{this.props.transfer.sender_firstname} {this.props.transfer.sender_lastname}</b>
              <br />
              <span>{this.props.transfer.sender_telephone}</span>
              <br />
              <span>{this.props.transfer.sender_address}</span>
              <br />
              {
                !this.state.origin_branch &&
                <a className="voirLaBranche" onClick={this.retrieveOriginBranch.bind(this)}>Branche</a>
              }
              {
                this.state.origin_branch &&
                <span className="itemItems">{this.state.origin_branch}</span>
              }
            </div>            
            <div className="col-lg-4 col-md-4 col-sm-4">
              <b>{this.props.transfer.receiver_firstname} {this.props.transfer.receiver_lastname}</b>
              <br />
              <span>{this.props.transfer.receiver_telephone}</span>
              <br />
              <span>{this.props.transfer.receiver_address}</span>
              <br />
              {
                !this.state.destination_branch &&
                <a className="voirLaBranche" onClick={this.retrieveDesinationBranch.bind(this)}>Branche</a>
              }
              {
                this.state.destination_branch &&
                <span className="itemItems">{this.state.destination_branch}</span>
              }
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2">
              <span className="transferDetails"><b>{this.props.transfer.code}</b></span>
              <br />
              <span className="transferDetails"><b>{this.props.transfer.amount} Dollars</b></span>
              <br />
              {
                (this.props.transfer.amount === this.props.transfer.amount_paid) &&
                <span className="payE">Payé</span>
              }
              {
                ((this.props.transfer.amount > this.props.transfer.amount_paid) && (this.props.transfer.amount_paid !== 0)) &&
                <span className="partiallyPayE">Partiellement payé</span>
              }
              {
                (this.props.transfer.amount_paid === 0) &&
                <span className="nonpayE">Non payé</span>
              }
              <br />
              <span className="date"><Moment format="DD/MM/YYYY">{this.props.transfer.createdAt}</Moment></span>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 table-actions">
              <ul>
                {
                  (!(this.props.transfer.amount === this.props.transfer.amount_paid) && 
                  (this.props.transfer.destination_branch === Meteor.user().profile.branch)) &&
                  <li onClick={this.navigateToPay.bind(this)} className="transferActionItem">
                    <a 
                      data-toggle="tooltip" 
                      data-placement="top" 
                      title="Payer">
                      <Icon icon="ion-card" fontSize="14px" className="transferIcon" color="#616161" />
                      <span>Payer</span>
                    </a>
                  </li>
                }
                {
                  ((Meteor.user().profile.isAdmin) 
                    && (this.props.transfer.amount !== this.props.transfer.amount_paid)) &&
                  <li onClick={this.navigateToEdit.bind(this)} className="transferActionItem">
                    <a 
                      data-toggle="tooltip" 
                      data-placement="top" 
                      title="Modifier">
                      <Icon icon="ion-edit" fontSize="14px"  className="transferIcon" color="#616161"/>
                      <span>Modifier</span>
                    </a>
                  </li>
                }
                {
                  ((Meteor.user().profile.isAdmin) &&
                  (this.props.transfer.amount_paid === 0)) &&  
                  <li onClick={this.transferDelete.bind(this)} className="transferActionItem">
                    <a 
                      data-toggle="tooltip" 
                      data-placement="top" 
                      title="Supprimer">
                      <Icon icon="ion-trash-b" fontSize="14px" className="transferIcon" color="#616161" />
                      <span>Supprimer</span>
                    </a>
                  </li>
                }
              </ul>
            </div>
          </div>
        }
      </div>
  	)
  }
}

function mapStateToProps(state) {
  return {
    isEditingTransfer : state.transferReducer.isEditingTransfer,
    isPayingTransfer: state.transferReducer.isPayingTransfer
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    setTransfer: setTransfer, 
    toggleTransferEditMode: toggleTransferEditMode,
    toggleTransferDeleteMode: toggleTransferDeleteMode,
    toggleTransferPayementMode: toggleTransferPayementMode
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(TransferItem);

