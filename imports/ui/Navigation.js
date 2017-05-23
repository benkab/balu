import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link, browserHistory } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Tracker } from 'meteor/tracker';
import './../styles/navigation.css';
import Icon from 'react-ionicons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleMenuState } from './../store/actions/menuActions';
import { Session } from 'meteor/session';
import Spinner from 'react-spinner-material';

class Navigation extends TrackerReact(Component) {

  constructor() {
    super();
    this.state = {
      user: null
    }
  }

  toggleMenu(event){
    event.preventDefault();
    this.props.toggleMenuState(this.props.menuIsDiplayed.menuIsDiplayed);
  }

  toggleNotification(event){
    event.preventDefault();
    this.setState({notifications: Session.get('notifications')})
    this.props.toggleNotificationState(this.props.notificationIsDiplayed.notificationIsDiplayed)
  }

  navigationToProfile(event){
    event.preventDefault();
    browserHistory.push('/profile')
  }

  navigateToHome(event){
    event.preventDefault();
    browserHistory.push('/home')
  }

  render() {
  	return (
  	  <div className="row navigation">
          <div className="handleNotifications">
            <a onClick={this.navigateToHome.bind(this)} className="logoLink">
              <b>
                <span>Park</span>Smart
              </b>
            </a>
          </div>
          <ul className="pull-right right-menu">
            <li className="names" onClick={this.navigationToProfile.bind(this)}>
              <Icon icon="ion-person" fontSize="21px" color="#ffffff"/>
            </li>
            <li>
              <a onClick={this.toggleMenu.bind(this)} className="ion-navicon-round">
                <Icon icon="ion-navicon-round" fontSize="23px" color="#ffffff"/>
              </a>
            </li>
          </ul>
      </div>
  	)
  }
}

function mapStateToProps(state) {
  return {
    menuIsDiplayed :state.menuReducer,
    notificationIsDiplayed: state.notificationReducer
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleMenuState: toggleMenuState
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Navigation);
