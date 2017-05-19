import React, { Component } from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import './../styles/notification.css';
import Icon from 'react-ionicons';
import { Session } from 'meteor/session';
import Notifications from './../api/Notification';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleNotificationState } from './../store/actions/notificationActions';
import { closeMenuState } from './../store/actions/menuActions';


class Notification extends TrackerReact(Component) {

  constructor() {
    super();
    this.state = {
      notifications: Meteor.subscribe('notifications'),
      transfertsCount: null,
      fretCount: null
    }
  }

  componentWillMount(){
    const transferts_count = Notifications.find({type: 'Transfert'}).count();
    if(transferts_count !== 0) {
      this.setState({transfertsCount: Notifications.find({type: 'Transfert'}).count()})
    }
  }

  componentWillUnmount() {
    this._renderComputation.stop();
    Meteor.subscribe('notifications').stop();
  }

  viewTransferts(){
    browserHistory.push('/transfers');
    this.props.closeMenuState(this.props.menuIsDiplayed.menuIsDiplayed);
    this.props.toggleNotificationState(this.props.notificationIsDiplayed.notificationIsDiplayed)
  }

  render() {
  	return (
  	  <div className="row notification">
        <div className="notification-container">
          <div className="small-arrow"></div>
          <div className="col-sm-12">
            <ul>
              {
                (this.state.transfertsCount && (Session.get('notification_count') !== 0)) &&
                <li onClick={this.viewTransferts.bind(this)}>
                  <a>
                    Vous avez (<b>{this.state.transfertsCount}</b>) nouveaux transferts à payer
                  </a>
                </li>
              }
              {
                !(this.state.transfertsCount && (Session.get('notification_count') !== 0)) &&
                <li>
                  Aucune nouvelle notification
                </li>
              }
            </ul>
          </div>
        </div> 
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
    closeMenuState: closeMenuState,
    toggleNotificationState: toggleNotificationState
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Notification);
