import React, { Component } from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import './../styles/menu.css';
import Icon from 'react-ionicons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { closeMenuState } from './../store/actions/menuActions';
import { Accounts } from 'meteor/accounts-base';

class Menu extends Component {

  constructor() {
    super();
  } 

  navigationToHome(){
    browserHistory.push('/home')
    this.props.closeMenuState(this.props.menuIsDiplayed.menuIsDiplayed);
  }

  navigationToParkings(){
    browserHistory.push('/parkings')
    this.props.closeMenuState(this.props.menuIsDiplayed.menuIsDiplayed);
  }

  navigationToLogs(){
    browserHistory.push('/logs')
    this.props.closeMenuState(this.props.menuIsDiplayed.menuIsDiplayed);
  }


  navigationToSignUp(){
    browserHistory.push('/users')
    this.props.closeMenuState(this.props.menuIsDiplayed.menuIsDiplayed);
  }

  navigationToProfile(){
    browserHistory.push('/profile')
    this.props.closeMenuState(this.props.menuIsDiplayed.menuIsDiplayed);
  }

  onLogout(){
    this.props.closeMenuState(this.props.menuIsDiplayed.menuIsDiplayed);
    Accounts.logout();  
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
              <li onClick={this.navigationToParkings.bind(this)}>
                <a className={((browserHistory.getCurrentLocation().pathname ===  '/parkings') ? 'active' : '')}>
                  Parkings
                </a>
              </li>
              <li onClick={this.navigationToLogs.bind(this)}>
                <a className={((browserHistory.getCurrentLocation().pathname ===  '/logs') ? 'active' : '')}>
                  Logs
                </a>
              </li>
              <li onClick={this.navigationToSignUp.bind(this)}>
                <a className={((browserHistory.getCurrentLocation().pathname ===  '/users') ? 'active' : '')}>
                  Users
                </a>
              </li>
              <li onClick={this.navigationToProfile.bind(this)}>
                <a className={((browserHistory.getCurrentLocation().pathname ===  '/profile') ? 'active' : '')}>
                  Mon profile
                </a>
              </li>
              <li onClick={this.onLogout.bind(this)}>
                <a>
                  Sign out
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
    menuIsDiplayed :state.menuReducer
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    closeMenuState: closeMenuState
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Menu);
