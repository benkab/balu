import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { connect } from 'react-redux';
import UserInput from './UserInput';
import UserList from './UserList';
import UserDelete from './UserDelete';
import Header from './Header';
import Signup from './Signup';
import './../styles/home.css';

class User extends TrackerReact(Component) {

  constructor() {
    super();
  }

  render() {
  	return (
      <div>
        <Header />
        <div className="row home">
          <div className="col-sm-12">
            <p className="home-title">Users</p>
            <p className="home-branch-title-line"></p>
          </div>
        </div>
        <Signup />
        <div className="row home">
          <div className="col-sm-12">
            <UserList />
          </div>
        </div>
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
