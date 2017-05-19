import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Branches from './../api/Branch';
import Users from './../api/User';

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
  	  <div className="panel panel-default">
        <div className="panel-heading second-heading">
          Tous les agents
        </div>
        <div className="panel-body branch-panel-body">
          <ul>
           {this.users().map( (user) => {
             return <UserItem key={user._id} user={user} />
           })}
          </ul>
        </div>
      </div>
  	)
  }
}
