import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
  toggleUserEditMode,
  setUser,
  cancelUserDeleteMode,
  toggleUserDeleteMode
} from './../store/actions/userActions';
import Icon from 'react-ionicons';
import Avatar from 'react-avatar';

class UserItem extends Component {

  constructor() {
    super();
    this.state = {
      branch: null,
      userNames: null
    }
  }

  componentWillMount()
  {
    this.setState({
      userNames: this.props.user.profile.firstname + " " + this.props.user.profile.lastname
    })
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
        <div className="col-xs-12 user-item">
          <div className="col-lg-1 col-md-2 col-sm-2 col-xs-12 first-column">
            <Avatar name={this.state.userNames} size={55} round/>
          </div>
          <div className="col-lg-5 col-md-4 col-sm-4 col-xs-12">
            <span>
              <b>{this.props.user.profile.firstname} {this.props.user.profile.lastname}</b>
            </span>
            <br />
            <span>
              {this.props.user.emails[0].address}
            </span>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
            <span>
              {this.props.user.profile.telephone}
            </span>
            <br />
            <span>
              {
                (this.props.user.profile.isAdmin === true) &&
                <span className="itemItems">Administrator</span>
              }
              {
                (this.props.user.profile.isAdmin === false) &&
                <span className="itemItems">Normal user</span>
              }
            </span>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">
            <ul className="text-left">
              <li>
                <a onClick={this.showUserToEdit.bind(this)}>
                  <Icon icon="ion-edit" fontSize="13px" />
                  &nbsp;<small>Edit</small>
                </a>
              </li>
              {
                (Meteor.userId() !== this.props.user._id) &&
                <li>
                  <a onClick={this.selectUser.bind(this)}>
                    <Icon icon="ion-trash-b" fontSize="13px" />
                    &nbsp;<small>Delete</small>
                  </a>
                </li>
              }
            </ul>
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

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleUserEditMode: toggleUserEditMode, 
    setUser: setUser,
    toggleUserDeleteMode: toggleUserDeleteMode
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(UserItem);
