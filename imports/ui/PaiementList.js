import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import PaiementItem from './PaiementItem';
import Paiements from './../api/Paiement';
import Transfers from './../api/Transfer';
import Branches from './../api/Branch';

class PaiementList extends TrackerReact(Component) {

  constructor() {
    super();
    this.state = {
      subscription : {
        paiements : Meteor.subscribe('paiements'),
        transfers : Meteor.subscribe('transfers'),
        branches : Meteor.subscribe('branches'),
        users : Meteor.subscribe('users')
      }
    }
  }

  componentWillUnmount() {
    this._renderComputation.stop();
    Meteor.subscribe('paiements').stop();
    Meteor.subscribe('transfers').stop();
    Meteor.subscribe('branches').stop();
    Meteor.subscribe('users').stop();
  }

  paiements() {
    return Paiements.find().fetch();
  } 

  render() {
  	return (
      <div>
          {this.paiements().map( (paiement) => {
            return <PaiementItem key={paiement._id} paiement={paiement} />
          })}
      </div>
  	)
  }

}

export default PaiementList;
