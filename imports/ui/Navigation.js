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
import { toggleNotificationState } from './../store/actions/notificationActions';
import { Session } from 'meteor/session';
import Notifications from './../api/Notification';

class Navigation extends TrackerReact(Component) {

  constructor() {
    super();
    this.state = {
      user: null
    }
  }

  componentDidMount(){
    Meteor.setTimeout(() => {
      this.setState({user: Meteor.user().profile})
    }, 200);
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

  render() {
  	return (
  	  <div className="row navigation">
          <div className="handleNotifications">
            <ul className="pull-left left-menu">
              <li onClick={this.toggleNotification.bind(this)}>
                <a>
                  <Icon icon="ion-ios-bell" fontSize="20px" color="#EBB06D"/>
                </a>
              </li>
              <li>
                <a>
                  <Icon icon="ion-android-chat" fontSize="20px" color="#ffffff"/>
                </a>
              </li>
            </ul>
          </div>
          <ul className="pull-right right-menu">
            {
              this.state.user &&
              <li className="names" onClick={this.navigationToProfile.bind(this)}>{this.state.user.firstname} {this.state.user.lastname}</li>
            }
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
    toggleMenuState: toggleMenuState,
    toggleNotificationState: toggleNotificationState
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Navigation);
