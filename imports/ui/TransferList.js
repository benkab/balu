import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import TransferItem from './TransferItem';
import Transfers from './../api/Transfer';

class TransferList extends TrackerReact(Component) {

  constructor() {
    super();
    this.state = {
      subscription : {
        users : Meteor.subscribe('users')
      }
    }
  }

  componentWillUnmount() {
    this._renderComputation.stop();
    Meteor.subscribe('users').stop();
  }

  transfers() {
    return Transfers.find().fetch();
  } 

  render() {
  	return (
      <div className="panel-body">
        <div className="table-header row">
          <div className="col-lg-4 col-md-4 col-sm-12">
            <p><b>Expediteur</b></p>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <p><b>Destinateur</b></p>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-12">
            <p><b>Details</b></p>
          </div>
          <div className="col-lg-1 col-md-1 col-sm-12">
          </div>
        </div>
         {this.transfers().map( (transfer) => {
            return <TransferItem key={transfer._id} transfer={transfer} />
         })}
        <div className="row footer-container">
          <div className="col-lg-2 col-md-3 col-sm-12 footer-search-container">
            <div className="form-group">
              <input type="text" className="form-control filter" id="search" name="search" placeholder="Recherche" />
            </div>
          </div>
        </div>
      </div>
  	)
  }

}

export default TransferList;
