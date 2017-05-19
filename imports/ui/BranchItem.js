import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setBranch, toggleEditMode } from './../store/actions/branchActions';
import { showBranch } from './../store/actions/branchActions';
import Icon from 'react-ionicons';
import Users from './../api/User';

class BranchItem extends Component {

  constructor() {
    super();
    this.state = {
      isDeletable: null
    }
  }

  componentDidMount(){
    Meteor.setTimeout(() => {
      const users_count = Users.findOne({'profile.branch': this.props.branch._id});
      if(!users_count){
        this.setState({isDeletable: true});
      }
    }, 500);
  }

  selectBranch(event){
    event.preventDefault();
    this.props.setBranch(this.props.branch)
  }

  showBranchToEdit(event){
    event.preventDefault();
    this.props.toggleEditMode(this.props.branch);
    this.props.setBranch(this.props.branch);
  }

  render(props) {
  	return (
      <li className="item">
        <b>{this.props.branch.description}</b>
        <ul className="pull-right">
          <li>
            <a onClick={this.showBranchToEdit.bind(this)}>
              <Icon icon="ion-edit" fontSize="14px" />
            </a>
          </li>
          {
            this.state.isDeletable &&
            <li>
              <a onClick={this.selectBranch.bind(this)}>
                <Icon icon="ion-trash-b" fontSize="14px" />
              </a>
            </li>
          }
        </ul>
      </li>
  	)
  }

}

function mapStateToProps(state) {
  return {
    selectedBranch :state.branchReducer
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    setBranch: setBranch, 
    showBranch: showBranch, 
    toggleEditMode: toggleEditMode
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(BranchItem);
