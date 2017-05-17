import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link, browserHistory } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Header from './Header';
import PaiementList from './PaiementList';

class Paiement extends TrackerReact(Component) {

  constructor() {
    super();
  }

  render() {
  	return (
      <div>
        <Header />
        <div className="row home">
          <div className="col-sm-12">
            <p className="home-title">Factures</p>
            <p className="home-branch-title-line"></p>
          </div>
          <PaiementList />
        </div>
      </div>
  	)
  }

}

export default Paiement;
