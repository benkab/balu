import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { connect } from 'react-redux';
import UserInput from './UserInput';
import UserList from './UserList';
import UserDelete from './UserDelete';
import './../styles/home.css';

class User extends TrackerReact(Component) {

  constructor() {
    super();
  }

  render() {
  	return (
      <div>
          <p className="home-title">Agents</p>
          <p className="home-branch-title-line home-user-title-line"></p>
          {
            this.props.isEditingUser.isEditingUser &&
            <UserInput />
          }
          {
            !this.props.isEditingUser.isEditingUser &&
            <UserList />
          }
      </div>
  	)
  }
}

function mapStateToProps(state) {
  return {
    isEditingUser : state.userReducer.isEditingUser
  }
}

export default connect(mapStateToProps)(User);
