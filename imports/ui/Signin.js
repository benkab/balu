import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import './../styles/auth.css';

class Signin extends Component {

  loginUser(event) {
    event.preventDefault();
    const user = {
      email: this.refs.email.value,
      password: this.refs.password.value
    }
    Meteor.loginWithPassword(user.email, JSON.stringify(user.password), (error) => {
      if(error){
        Bert.alert('Connexion refusée avec ces données', 'danger');
      } else {
        Bert.alert('Vous etes maintenant connecté', 'success');
        this.refs.password.value = '';
        this.refs.email.value = '';
        browserHistory.push('/home');
      }
    });
  }

  render() {
    return (
      <div>
        <div className="row auth-container">
          <div className="col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-sm-8 col-sm-offset-2 col-xs-12">
            <div className="auth">
              <p className="auth-title">Connexion</p>
              <p className="auth-title-line"></p>
              <div className="panel panel-default">
                <div className="panel-body">
                  <form className="new-user" onSubmit={this.loginUser.bind(this)}>
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
                    <p className="forgottenPasswordLink">
                      <a>Mot de passe oublié</a>
                    </p>
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

export default Signin;
