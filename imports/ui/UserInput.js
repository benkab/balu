import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Branches from './../api/Branch';
import { 
  cancelUserEditMode, 
  setUser
} from './../store/actions/userActions';

class UserInput extends Component {

  constructor() {
    super();

    this.state = {
      updateBranch : null,
      updateRole: null
    }
  }

  branches() {
    return Branches.find().fetch();
  }

  onChangeRole(event) {
    event.preventDefault();
    var role = this.refs.role.value.trim();
    if(role === 'null'){
      this.setState({updateRole: true});
    } else {
      this.setState({updateRole: false});
    }
  }

  onChangeBranch(event) {
    event.preventDefault();
    var branch = this.refs.branch.value.trim();
    if(branch === 'null'){
      this.setState({updateBranch: true});
    } else {
      this.setState({updateBranch: false});
    }
  }

  cancelEditUser (event) {
    event.preventDefault();
    this.props.cancelUserEditMode(this.props.isEditingUser.isEditingUser);
    this.props.setUser(null);
  }
  
  
  updateUser(event) {
    event.preventDefault();
    const id = this.props.user.user._id;
    const firstname = this.props.user.user.profile.firstname;
    const lastname = this.props.user.user.profile.lastname;
    const telephone = this.props.user.user.profile.telephone;
    const branch = this.refs.branch.value.trim();
    const isAdmin = this.refs.role.value.trim();

    if(role === 'null'){
      this.setState({updateRole: true});
    } else if(branch === 'null'){
      this.setState({updateBranch: true});
    } else {
      const user = {
        id: id,
        firstname: firstname,
        lastname: lastname,
        telephone: telephone,
        branch: branch,
        isAdmin: isAdmin
      }
      Meteor.call('updateUser', user, (error)=> {
        if(error){
          console.log(error);
        } else {
          Bert.alert('Les données de cet agent ont été mises à jour', 'success');
          this.props.cancelUserEditMode(this.props.isEditingUser.isEditingUser);
          this.props.setUser(null);
        }
      });
    }
  }

  render() {
  	return (
      <div>
          <div className="panel panel-default">
            <div>
              <div className="panel-heading">
                Mettre l'agent à jour
              </div>
              <div className="panel-body">
                <form className="new-branch" onSubmit={this.updateUser.bind(this)}>
                    <div className="form-group">
                      <label htmlFor="firstname">Prenom</label>
                      <input 
                        type="text" 
                        className="form-control"
                        id="firstname"
                        ref="firstname"
                        value={this.props.user.user.profile.firstname}
                        readOnly
                        name="firstname" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastname">Nom</label>
                      <input 
                        type="text" 
                        className="form-control"
                        id="lastname"
                        ref="lastname"
                        value={this.props.user.user.profile.lastname}
                        readOnly
                        name="lastname" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <div className={'select-enclosure ' + (this.state.updateRole ? 'error-input' : '')}>
                          <select
                            type="text" 
                            className="form-control"
                            id="role" 
                            defaultValue={this.props.user.user.profile.isAdmin}
                            onChange={this.onChangeRole.bind(this)}
                            ref="role"
                            name="role">
                            <option value="null">Choisir un role</option>
                            <option value="false">Agent</option>
                            <option value="true">Administrateur</option>
                          </select>
                        </div>
                    </div>
                    {
                      this.state.updateRole &&
                      <p className="error-message">Ce champ est obligatoire</p>
                    }
                    <div className="form-group">
                        <label htmlFor="branch">Branche</label>
                        <div className={'select-enclosure ' + (this.state.updateBranch ? 'error-input' : '')}>
                          <select
                            type="text" 
                            className="form-control"
                            id="branch" 
                            defaultValue={this.props.user.user.profile.branch}
                            onChange={this.onChangeBranch.bind(this)}
                            ref="branch"
                            name="branch">
                            <option value="null">Choisir une branche</option>
                            {this.branches().map( (singleBranch) => {
                               return <option key={singleBranch._id} value={singleBranch._id}>{singleBranch.description}</option>
                            })}
                          </select>
                        </div>
                    </div>
                    {
                      this.state.updateBranch &&
                      <p className="error-message">Ce champ est obligatoire</p>
                    }
                    <button type="submit" className="btn btn-success btn-block">Soumettre</button>
                    <p className="cancelEditing">
                      <a type="button" className="btn btn-block" onClick={this.cancelEditUser.bind(this)}>Annuler</a>
                    </p>
                </form>
              </div>
            </div>
          </div>
      </div>
  	)
  }

}

function mapStateToProps(state) {
  return {
    isEditingUser : state.userReducer.isEditingUser,
    user: state.userReducer.user
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    cancelUserEditMode: cancelUserEditMode,
    setUser: setUser
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(UserInput);
