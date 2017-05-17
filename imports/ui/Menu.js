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

  navigationToTransfers(){
    browserHistory.push('/transfers')
    this.props.closeMenuState(this.props.menuIsDiplayed.menuIsDiplayed);
  }

  navigationToPaiement(){
    browserHistory.push('/paiements')
    this.props.closeMenuState(this.props.menuIsDiplayed.menuIsDiplayed);
  }

  onLogout(){
    browserHistory.push('/')
    Accounts.logout();
    this.props.closeMenuState(this.props.menuIsDiplayed.menuIsDiplayed);
  }

  render() {
  	return (
  	  <div className="row menu">
        <div className="small-arrow"></div>
        <div className="col-sm-12">
          <ul>
            <li onClick={this.navigationToHome.bind(this)}>
             <a className="active">Home</a>
            </li>
            <li onClick={this.navigationToTransfers.bind(this)}>
             <a>Transferts</a>
            </li>
            <li>
             <a>Frets</a>
            </li>
            <li onClick={this.navigationToPaiement.bind(this)}>
             <a>Factures</a>
            </li>
            <li>
             <a>Rapports</a>
            </li>
            <li onClick={this.onLogout.bind(this)}>
             <a>Deconnexion</a>
            </li>
          </ul>
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
