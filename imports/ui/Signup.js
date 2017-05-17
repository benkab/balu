import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import './../styles/auth.css';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import User from './../api/User';
import Branches from './../api/Branch';

class Signup extends TrackerReact(Component) {

  constructor() {
    super();

    this.state = {
      subscription : {
        branches : Meteor.subscribe('branches')
      }
    }
  } 

  branches() {
    return Branches.find().fetch();
  }

  addUser (event) {
    event.preventDefault();
    const user = {
      firstname: this.refs.firstname.value,
      lastname: this.refs.lastname.value,
      telephone: this.refs.telephone.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
      branch: this.refs.branch.value
    }
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
      }
    });
  }

  render() {
  	return (
  	  <div>
        <div className="signup row">
          <div className="col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-sm-8 col-sm-offset-2 col-xs-12">
            <div className="auth">
              <p className="auth-title">Créer un compte</p>
              <p className="auth-title-line"></p>
              <div className="panel panel-default">
                <div className="panel-body">
                  <form className="new-user" onSubmit={this.addUser.bind(this)}>
                    <div className="form-group">
                      <label htmlFor="firstname">Prénom</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="firstname"
                        ref="firstname" 
                        name="firstname" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastname">Nom</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="lastname" 
                        ref="lastname" 
                        name="lastname" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="telephone">Telephone</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="telephone" 
                        ref="telephone" 
                        name="telephone" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="email" 
                        ref="email" 
                        name="email" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Mot de passe</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        ref="password" 
                        name="password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="branch">Branche</label>
                        <div className="select-enclosure">
                          <select
                            type="text" 
                            className="form-control"
                            id="branch" 
                            ref="branch"
                            name="branch">
                            <option value="null">Choisir une branche</option>
                            {this.branches().map( (singleBranch) => {
                               return <option key={singleBranch._id} value={singleBranch._id}>{singleBranch.description}</option>
                            })}
                          </select>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success btn-block">Soumettre</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  	)
  }

}

export default Signup;
