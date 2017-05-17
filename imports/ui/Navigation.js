import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import './../styles/navigation.css';
import Icon from 'react-ionicons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleMenuState } from './../store/actions/menuActions';

class Navigation extends Component {

  constructor() {
    super();
  } 

  toggleMenu(event){
    event.preventDefault();
    this.props.toggleMenuState(this.props.menuIsDiplayed.menuIsDiplayed);
  }

  toggleNotification(event){
    event.preventDefault();
  }

  render() {
  	return (
  	  <div className="row navigation">
          <div className="handleNotifications">
            <span>Afficher les notifications</span>
          </div>
          <ul className="pull-right">
            <li>
              <a onClick={this.toggleMenu.bind(this)} className="ion-navicon-round">
                <Icon icon="ion-navicon-round" fontSize="19px" color="#ffffff"/>
              </a>
            </li>
          </ul>
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
    toggleMenuState: toggleMenuState
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Navigation);
