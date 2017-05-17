import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Branches from './../api/Branch';

import BranchList from './BranchList';
import BranchInput from './BranchInput';
import DeleteBranchConfirmation from './DeleteBranchConfirmation';
import { connect } from 'react-redux';
import './../styles/home.css';

class Branch extends TrackerReact(Component) {

  constructor() {
    super();

    this.state = {
      subscription : {
        branches : Meteor.subscribe('branches')
      }
    }
  }

  componentWillUnmount() {
    this.state.subscription.branches.stop();
  }

  render() {
  	return (
      <div>
        <p className="home-title">Branches</p>
        <p className="home-branch-title-line"></p>
        <DeleteBranchConfirmation />
        <BranchInput />
        {
          !this.props.isEditing.isEditing &&
          <BranchList />
        }
      </div>
  	)
  }

}

function mapStateToProps(state) {
  return {
    isEditing : state.branchReducer.isEditing
  }
}

export default connect(mapStateToProps)(Branch);
