import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import './../styles/auth.css';

class Signin extends Component {

  constructor() {
    super();

    this.state = {
      email_state: null,
      password_state: null
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

  loginUser(event) {
    event.preventDefault();
    const user = {
      email: this.refs.email.value.trim(),
      password: this.refs.password.value.trim()
    }

    if(!this.refs.email.value.trim()){
      this.setState({email_state: true});
    } 
    else if(!this.refs.password.value.trim()){
      this.setState({password_state: true});
    } 
    else {
      Meteor.loginWithPassword(user.email, JSON.stringify(user.password), (error) => {
        if(error){
          Bert.alert('Connexion refusée avec ces données', 'danger');
        } else {
          Bert.alert('Vous etes maintenant connecté', 'success');
          this.refs.password.value = '';
          this.refs.email.value = '';
          this.setState({email_state: false});
          this.setState({password_state: false});
          browserHistory.push('/home');
        }
      });
    }
      
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
