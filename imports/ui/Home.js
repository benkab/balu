import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import './../styles/home.css';
import Navigation from './Navigation';
import Branch from './Branch';
import User from './User';
import Menu from './Menu';
import Header from './Header';
import Icon from 'react-ionicons';
import Spinner from 'react-spinner-material';

class Home extends TrackerReact(Component) {

  constructor() {
    super();
    this.state = {
      isAdmin: null,
      hasReachedTimeout: false
    }
  }

  componentDidMount(){
    Meteor.setTimeout(() => {
      this.setState({isAdmin: Meteor.user().profile.isAdmin})
      this.setState({hasReachedTimeout: true})
    }, 1000);
  }

  navigationToTransfers(){
    browserHistory.push('/transfers')
  }

  navigationToPaiement(){
    browserHistory.push('/paiements')
  }

  navigationToProfile(){
    browserHistory.push('/profile')
  }

  render() {
    return (
      <div>
        <Header />
        <div className="row home">
          <div className="row">
            <div className="col-sm-12">
              <p className="home-title">Agents</p>
              <p className="home-branch-title-line home-user-title-line home-pages-title-line"></p>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <div className="panel" onClick={this.navigationToTransfers.bind(this)}>
                <div className="panel-body home-page-link">
                  <Icon icon="ion-card" fontSize="54px"  color="#555E65"/>
                  <br />
                  <br />
                  <p><b>Transferts</b></p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <div className="panel">
                <div className="panel-body home-page-link">
                  <Icon icon="ion-bag" fontSize="54px"  color="#555E65"/>
                  <br />
                  <br />
                  <p><b>Frets</b></p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <div className="panel" onClick={this.navigationToPaiement.bind(this)}>
                <div className="panel-body home-page-link">
                  <Icon icon="ion-printer" fontSize="54px"  color="#555E65"/>
                  <br />
                  <br />
                  <p><b>Factures</b></p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <div className="panel" onClick={this.navigationToProfile.bind(this)}>
                <div className="panel-body home-page-link">
                  <Icon icon="ion-person" fontSize="54px"  color="#555E65"/>
                  <br />
                  <br />
                  <p><b>Mon profile</b></p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          {
            (!this.state.isAdmin && !this.state.hasReachedTimeout) &&
            <div className="col-sm-12">
             <Spinner width={50}
                height={50}
                spinnerColor={"#4B4949"}
                spinnerWidth={2}
                show={true} />
            </div>
          }
          {
            (this.state.isAdmin && this.state.hasReachedTimeout) &&
            <div>
              <div className="col-lg-3 col-md-3 col-sm-12">
                <Branch />
                <hr />
              </div>
              <div className="col-lg-3 col-md-3 col-sm-12">
                <User />
                <hr />
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Home;

