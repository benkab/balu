import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Users from './../api/User';
import Signup from './Signup';
import UserItem from './UserItem';
import './../styles/home.css';

export default class UserList extends TrackerReact(Component) {

  constructor() {
    super();

    this.state = {
      subscription : {
        users : Meteor.subscribe('users')
      }
    }
  }

  users() {
    return Users.find({}).fetch();
  } 

  componentWillUnmount() {
    Meteor.subscribe('users').stop();
  }

  render() {
  	return (
        <div className="home-management">
          <div className="panel panel-default">
            <div className="panel-heading second-heading">
              Management
            </div>
            <div className="panel-body branch-panel-body">
              <ul>
               {this.users().map( (user) => {
                 return <UserItem key={user._id} user={user} />
               })}
              </ul>
            </div>
          </div>
        </div>      
  	)
  }
}
