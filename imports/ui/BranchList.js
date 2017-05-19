import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Branches from './../api/Branch';

import BranchItem from './BranchItem';
import './../styles/home.css';

export default class BranchList extends TrackerReact(Component) {

  constructor() {
    super();

    this.state = {
       branch: null
    }
  }

  branches() {
    return Branches.find().fetch();
  } 

  render() {
  	return (
  	  <div className="panel panel-default">
        <div className="panel-heading second-heading">
          Toutes les branches
        </div>
        <div className="panel-body branch-panel-body">
          <ul>
           {this.branches().map( (branch) => {
             return <BranchItem key={branch._id} branch={branch} />
           })}
          </ul>
        </div>
      </div>
  	)
  }

}