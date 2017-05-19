import React, { Component } from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import './../styles/menu.css';
import Icon from 'react-ionicons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { closeMenuState } from './../store/actions/menuActions';
import { closeNotificationState } from './../store/actions/notificationActions';
import { Accounts } from 'meteor/accounts-base';

class Menu extends Component {

  constructor() {
    super();
  } 

  navigationToHome(){
    browserHistory.push('/home')
    this.props.closeMenuState(this.props.menuIsDiplayed.menuIsDiplayed);
    this.props.closeNotificationState(this.props.notificationIsDiplayed.notificationIsDiplayed)
  }

  navigationToTransfers(){
    browserHistory.push('/transfers')
    this.props.closeMenuState(this.props.menuIsDiplayed.menuIsDiplayed);
    this.props.closeNotificationState(this.props.notificationIsDiplayed.notificationIsDiplayed)
  }

  navigationToPaiement(){
    browserHistory.push('/paiements')
    this.props.closeMenuState(this.props.menuIsDiplayed.menuIsDiplayed);
    this.props.closeNotificationState(this.props.notificationIsDiplayed.notificationIsDiplayed)
  }

  navigationToSignUp(){
    browserHistory.push('/signup')
    this.props.closeMenuState(this.props.menuIsDiplayed.menuIsDiplayed);
    this.props.closeNotificationState(this.props.notificationIsDiplayed.notificationIsDiplayed)
  }

  navigationToProfile(){
    browserHistory.push('/profile')
    this.props.closeMenuState(this.props.menuIsDiplayed.menuIsDiplayed);
    this.props.closeNotificationState(this.props.notificationIsDiplayed.notificationIsDiplayed)
  }

  onLogout(){
    browserHistory.push('/')
    Accounts.logout();
    this.props.closeMenuState(this.props.menuIsDiplayed.menuIsDiplayed);
  }

  render() {
  	return (
  	  <div className="row menu">
        <div className="menu-container">
          <div className="small-arrow"></div>
          <div className="col-sm-12">
            <ul>
              <li onClick={this.navigationToHome.bind(this)}>
                <a className={((browserHistory.getCurrentLocation().pathname ===  '/home') ? 'active' : '')}>
                  Home
                </a>
              </li>
              <li onClick={this.navigationToTransfers.bind(this)}>
                <a className={((browserHistory.getCurrentLocation().pathname ===  '/transfers') ? 'active' : '')}>
                  Transferts
                </a>
              </li>
              <li>
                <a>
                  Frets
                </a>
              </li>
              <li onClick={this.navigationToSignUp.bind(this)}>
                <a className={((browserHistory.getCurrentLocation().pathname ===  '/signup') ? 'active' : '')}>
                  Ajouter un agent
                </a>
              </li>
              <li onClick={this.navigationToPaiement.bind(this)}>
                <a className={((browserHistory.getCurrentLocation().pathname ===  '/paiements') ? 'active' : '')}>
                  Factures
                </a>
              </li>
              <li>
                <a>
                  Rapports
                </a>
              </li>
              <li onClick={this.navigationToProfile.bind(this)}>
                <a className={((browserHistory.getCurrentLocation().pathname ===  '/profile') ? 'active' : '')}>
                  Mon profile
                </a>
              </li>
              <li onClick={this.onLogout.bind(this)}>
                <a>
                  Deconnexion
                </a>
              </li>
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
    closeNotificationState: closeNotificationState
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Menu);
