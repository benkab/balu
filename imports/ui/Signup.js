import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import './../styles/auth.css';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import User from './../api/User';
import Branches from './../api/Branch';
import Header from './Header';

class Signup extends TrackerReact(Component) {

  constructor() {
    super();

    this.state = {
      subscription : {
        branches : Meteor.subscribe('branches')
      },
      firstname_state: null,
      lastname_state: null,
      telephone_state: null,
      email_state: null,
      password_state: null,
      branch_state: null,
      phone_number_match_state: null,
      role_state: null
    }
  } 

  componentWillUnmount() {
    Meteor.subscribe('branches').stop();
  }

  branches() {
    return Branches.find().fetch();
  }

  addUser (event) {
    event.preventDefault();

    const user = {
      firstname: this.refs.firstname.value.trim(),
      lastname: this.refs.lastname.value.trim(),
      telephone: this.refs.telephone.value.trim(),
      email: this.refs.email.value.trim(),
      password: this.refs.password.value.trim(),
      branch: this.refs.branch.value.trim(),
      isAdmin: this.refs.role.value.trim()
    }

    const phonenumber = /^\d{10}$/;

    if(!this.refs.firstname.value.trim()){
      this.setState({firstname_state: true});
    } 
    else if(!this.refs.lastname.value.trim()){
      this.setState({lastname_state: true});
    } 
    else if(!this.refs.telephone.value.trim()){
      this.setState({telephone_state: true});
    } 
    else if(!this.refs.telephone.value.trim().match(phonenumber)){
      this.setState({phone_number_match_state: true});
    } 
    else if(!this.refs.email.value.trim()){
      this.setState({email_state: true});
    } 
    else if(!this.refs.password.value.trim()){
      this.setState({password_state: true});
    } 
    else if(this.refs.branch.value.trim() === 'null'){
      this.setState({branch_state: true});
    } else if(role === 'null'){
      this.setState({role_state: true});
    } 
    else {
      Meteor.call('addUser', user, (error)=> {
        if(error){
          console.log(error);
        } else {
          Bert.alert('Un nouveau compte a été créé', 'success');
          this.refs.firstname.value = '';
          this.refs.lastname.value = '';
          this.refs.telephone.value = '';
          this.refs.password.value = '';
          this.refs.email.value = '';
          this.refs.branch.value = '';
          this.refs.role.value = 'null';

          this.setState({firstname_state: false});
          this.setState({lastname_state: false});
          this.setState({telephone_state: false});
          this.setState({email_state: false});
          this.setState({password_state: false});
          this.setState({branch_state: false});
          this.setState({phone_number_match_state: false});
          this.setState({role_state: false});

        }
      });
    }
  }

  onChangeFirstname(event) {
    event.preventDefault();
    var firstname = this.refs.firstname.value.trim();
    if(!firstname){
      this.setState({firstname_state: true});
    } 
    else {
      this.setState({firstname_state: false});
    }
  }

  onChangeLastname(event) {
    event.preventDefault();
    var lastname = this.refs.lastname.value.trim();
    if(!lastname){
      this.setState({lastname_state: true});
    } 
    else {
      this.setState({lastname_state: false});
    }
  }

  onChangeTelelephone(event) {
    event.preventDefault();
    const phonenumber = /^\d{10}$/;
    var telephone = this.refs.telephone.value.trim();
    if(!telephone){
      this.setState({telephone_state: true});
      this.setState({phone_number_match_state: true});
    } 
    else if(!telephone.match(phonenumber)) {
      this.setState({telephone_state: true});
      this.setState({phone_number_match_state: true});
    }
    else {
      this.setState({telephone_state: false});
      this.setState({phone_number_match_state: false});
    }
  }

  onChangeEmail(event) {
    event.preventDefault();
    var email = this.refs.email.value.trim();
    if(!email){
      this.setState({email_state: true});
    } 
    else {
      this.setState({email_state: false});
    }
  }

  onChangePassword(event) {
    event.preventDefault();
    var password = this.refs.password.value.trim();
    if(!password){
      this.setState({password_state: true});
    } 
    else {
      this.setState({password_state: false});
    }
  }

  onChangeBranch(event) {
    event.preventDefault();
    var branch = this.refs.branch.value.trim();
    if(branch === 'null'){
      this.setState({branch_state: true});
    } 
    else {
      this.setState({branch_state: false});
    }
  }

  onChangeRole(event) {
    event.preventDefault();
    var role = this.refs.role.value.trim();
    if(role === 'null'){
      this.setState({role_state: true});
    } else {
      this.setState({role_state: false});
    }
  }

  render() {
  	return (
  	  <div>
        <Header />
        <div className="row home">
          <div className="col-sm-12">
            <p className="home-title">
              Nouvel agent
            </p>
            <p className="home-branch-title-line"></p>
            <div className="panel panel-default section-panel">
              <div className="panel-heading second-heading">
                Ajouter un nouvel agent
              </div>
              <div className="panel-body">
                <form className="new-user" onSubmit={this.addUser.bind(this)}>
                  <div className="section-form-row row">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <div className="form-group">
                        <label htmlFor="firstname">Prénom</label>
                        <input 
                          type="text" 
                          className={'form-control ' + (this.state.firstname_state ? 'error-input' : '')} 
                          id="firstname"
                          ref="firstname" 
                          onChange={this.onChangeFirstname.bind(this)}
                          name="firstname" />
                      </div>
                      {
                        this.state.firstname_state &&
                        <p className="error-message">Ce champ est obligatoire</p>
                      }
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <div className="form-group">
                        <label htmlFor="lastname">Nom</label>
                        <input 
                          type="text" 
                          className={'form-control ' + (this.state.lastname_state ? 'error-input' : '')}
                          id="lastname" 
                          ref="lastname" 
                          onChange={this.onChangeLastname.bind(this)}
                          name="lastname" />
                      </div>
                      {
                        this.state.lastname_state &&
                        <p className="error-message">Ce champ est obligatoire</p>
                      }
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <div className="form-group">
                        <label htmlFor="telephone">Telephone</label>
                        <input 
                          type="text" 
                          className={'form-control ' + (this.state.telephone_state ? 'error-input' : '')}
                          id="telephone" 
                          ref="telephone" 
                          onChange={this.onChangeTelelephone.bind(this)}
                          name="telephone" />
                      </div>
                      {
                        (this.state.telephone_state || this.state.phone_number_match_state) &&
                        <p className="error-message">Ce champ est obligatoire et doit container un numero valide</p>
                      }
                    </div>
                  </div>
                  <div className="section-form-row row">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                          type="text" 
                          className={'form-control ' + (this.state.email_state ? 'error-input' : '')}
                          id="email" 
                          ref="email" 
                          onChange={this.onChangeEmail.bind(this)}
                          name="email" />
                      </div>
                      {
                        this.state.email_state &&
                        <p className="error-message">Ce champ est obligatoire</p>
                      }
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input 
                          type="password" 
                          className={'form-control ' + (this.state.password_state ? 'error-input' : '')}
                          id="password" 
                          ref="password" 
                          onChange={this.onChangePassword.bind(this)}
                          name="password" />
                      </div>
                      {
                        this.state.password_state &&
                        <p className="error-message">Ce champ est obligatoire</p>
                      }
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <div className="form-group">
                        <label htmlFor="branch">Branche</label>
                        <div className={'select-enclosure ' + (this.state.branch_state ? 'error-input' : '')}>
                          <select
                            type="text" 
                            className="form-control"
                            id="branch" 
                            ref="branch"
                            onChange={this.onChangeBranch.bind(this)}
                            name="branch">
                            <option value="null">Choisir une branche</option>
                            {this.branches().map( (singleBranch) => {
                               return <option key={singleBranch._id} value={singleBranch._id}>{singleBranch.description}</option>
                            })}
                          </select>
                        </div>
                      </div>
                      {
                        this.state.branch_state &&
                        <p className="error-message">Ce champ est obligatoire</p>
                      }
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <div className={'select-enclosure ' + (this.state.role_state ? 'error-input' : '')}>
                          <select
                            className="form-control"
                            id="role" 
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
                        this.state.role_state &&
                        <p className="error-message">Ce champ est obligatoire</p>
                      }
                    </div>
                  </div>
                  <button type="submit" className="small-submit-btn">Soumettre</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  	)
  }

}

export default Signup;
