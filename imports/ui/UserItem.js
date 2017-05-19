import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Branches from './../api/Branch';
import { 
  toggleUserEditMode,
  setUser,
  cancelUserDeleteMode,
  toggleUserDeleteMode
} from './../store/actions/userActions';
import Icon from 'react-ionicons';

class UserItem extends Component {

  constructor() {
    super();
    this.state = {
      branch: null
    }
  }

  retrieveBranch(){
    const singleBranch = Branches.findOne({_id: this.props.user.profile.branch});
    this.setState({branch: singleBranch.description});
  }

  selectUser(event){
    event.preventDefault();
    this.props.setUser(this.props.user);
    this.props.toggleUserDeleteMode(null);
  }

  showUserToEdit (event) {
    event.preventDefault();
    this.props.toggleUserEditMode(this.props.isEditingUser.isEditingUser);
    this.props.setUser(this.props.user);
  }

  render(props) {
  	return (
        <li className="item">
          {
            (this.props.user.profile.isAdmin === true || this.props.user.profile.isAdmin === 'true') &&
            <span className="itemItems">Administrateur</span>
          }
          {
            (this.props.user.profile.isAdmin === false || this.props.user.profile.isAdmin === 'false') &&
            <span className="itemItems">Agent</span>
          }
          <br />
          <b>{this.props.user.profile.firstname} {this.props.user.profile.lastname}</b>
          <br />
          <span className="itemItems">{this.props.user.profile.telephone}</span>
          <br />
          {
            !this.state.branch &&
            <a className="voirLaBranche" onClick={this.retrieveBranch.bind(this)}>Branche</a>
          }
          {
            this.state.branch &&
            <span className="itemItems">{this.state.branch}</span>
          }
          <ul className="pull-right">
            <li>
              <a onClick={this.showUserToEdit.bind(this)}>
                <Icon icon="ion-edit" fontSize="14px" />
              </a>
            </li>
            <li className={(Meteor.userId() === this.props.user._id) ? 'hideIcon' : ''}>
              <a onClick={this.selectUser.bind(this)}>
                <Icon icon="ion-trash-b" fontSize="14px" />
              </a>
            </li>
          </ul>
        </li>
  	)
  }

}

function mapStateToProps(state) {
  return {
    isEditingUser : state.userReducer.isEditingUser
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleUserEditMode: toggleUserEditMode, 
    setUser: setUser,
    toggleUserDeleteMode: toggleUserDeleteMode
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(UserItem);
