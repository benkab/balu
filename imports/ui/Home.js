import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import './../styles/home.css';
import Navigation from './Navigation';
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

  navigationToParkings(){
    browserHistory.push('/parkings')
  }

  navigationToLogs(){
    browserHistory.push('/logs')
  }

  navigationToUsers(){
    browserHistory.push('/users')
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
              <p className="home-title">Dashboard</p>
              <p className="home-branch-title-line home-user-title-line home-pages-title-line"></p>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <div className="panel" onClick={this.navigationToParkings.bind(this)}>
                <div className="panel-body home-page-link">
                  <Icon icon="ion-android-locate" fontSize="54px"  color="#555E65"/>
                  <br />
                  <br />
                  <p><b>Parkings</b></p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <div className="panel" onClick={this.navigationToLogs.bind(this)}>
                <div className="panel-body home-page-link">
                  <Icon icon="ion-filing" fontSize="54px"  color="#555E65"/>
                  <br />
                  <br />
                  <p><b>Logs</b></p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <div className="panel" onClick={this.navigationToUsers.bind(this)}>
                <div className="panel-body home-page-link">
                  <Icon icon="ion-ios-people" fontSize="54px"  color="#555E65"/>
                  <br />
                  <br />
                  <p><b>Users</b></p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <div className="panel" onClick={this.navigationToProfile.bind(this)}>
                <div className="panel-body home-page-link">
                  <Icon icon="ion-ios-person" fontSize="54px"  color="#555E65"/>
                  <br />
                  <br />
                  <p><b>Mon profile</b></p>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    )
  }
}

export default Home;

