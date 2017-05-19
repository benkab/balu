import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Navigation from './Navigation';
import Menu from './Menu';
import Notification from './Notification';
import { connect } from 'react-redux';

class Header extends Component {

  render() {
    return (
      <div>
        <Navigation />
        {
          this.props.notificationIsDiplayed.notificationIsDiplayed &&
          <Notification />
        }
        {
          this.props.menuIsDiplayed.menuIsDiplayed &&
          <Menu />
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    menuIsDiplayed :state.menuReducer.menuIsDiplayed,
    notificationIsDiplayed: state.notificationReducer.notificationIsDiplayed
  }
}

export default connect(mapStateToProps)(Header);

