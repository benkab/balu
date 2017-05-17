import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link, browserHistory } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import TransferList from './TransferList';
import Transfers from './../api/Transfer';
import TransferEdit from './TransferEdit';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TransferDelete from './TransferDelete';
import TransferPay from './TransferPay';
import Navigation from './Navigation';
import Menu from './Menu';
import Header from './Header';

class Transfer extends TrackerReact(Component) {

  constructor() {
    super();
  }

  componentWillMount() {
    this.state = {
      subscription : {
        transfers : Meteor.subscribe('transfers'),
        branches: Meteor.subscribe('branches')
      }
    }
  }

  componentWillUnmount() {
    this._renderComputation.stop();
    this.state.subscription.transfers.stop();
    this.state.subscription.branches.stop();
  }
  
  navigate(event){
    event.preventDefault();
    browserHistory.push('/transfers/create');
  }

  render() {
  	return (
      <div>
        <Header />
        {
          (!this.props.isEditingTransfer.isEditingTransfer && !this.props.isPayingTransfer.isPayingTransfer) &&
          <div className="row home">
            <div className="col-sm-12">
              <p className="home-title">
                Transferts
                <a className="pull-right create-section-button" onClick={this.navigate.bind(this)}>Ajouter un transfert</a>
              </p>
              <p className="home-branch-title-line"></p>
              <TransferDelete />
              <div className="panel panel-default section-panel">
                <div className="panel-heading second-heading">
                  Tous les transferts
                </div>
                <TransferList />
              </div>
            </div>
          </div>
        }
        {
          this.props.isEditingTransfer.isEditingTransfer &&
          <TransferEdit />
        }
        {
          this.props.isPayingTransfer.isPayingTransfer &&
          <TransferPay />
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


export default connect(mapStateToProps)(Transfer);
