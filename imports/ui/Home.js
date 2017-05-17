import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router';
import './../styles/home.css';
import Navigation from './Navigation';
import Branch from './Branch';
import User from './User';
import Menu from './Menu';
import Header from './Header';

class Home extends Component {

  render() {
    return (
      <div>
        <Header />
        <div className="row home">
          <div className="col-lg-3 col-md-3 col-sm-12">
            <Branch />
            <hr />
          </div>
          <div className="col-lg-3 col-md-3 col-sm-12">
            <User />
            <hr />
          </div>
        </div>
      </div>
    )
  }
}

export default Home;

