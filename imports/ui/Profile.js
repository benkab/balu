import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import './../styles/auth.css';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Header from './Header';

class Profile extends TrackerReact(Component) {

  constructor() {
    super();

    this.state = {
      user: null,
      firstname_state: null,
      lastname_state: null,
      telephone_state: null,
      email_state: null,
      password_state: null,
      confirm_password_state: null,
      branch_state: null,
      phone_number_match_state: null
    }
  } 

  loadProfile(){
    this.setState({user: Meteor.user()})
  }

  updateProfile (event) {
    event.preventDefault();

    const user = {
      firstname: this.refs.firstname.value.trim(),
      lastname: this.refs.lastname.value.trim(),
      telephone: this.refs.telephone.value.trim(),
      email: this.refs.email.value.trim()
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
    } else {
      Meteor.call('updateProfle', user, (error)=> {
        if(error){
          console.log(error);
        } else {
          Bert.alert('Votre profile a été mis à jour', 'success');
          this.refs.firstname.value = '';
          this.refs.lastname.value = '';
          this.refs.telephone.value = '';
          this.refs.password.value = '';
          this.refs.email.value = '';
          

          this.setState({firstname_state: false});
          this.setState({lastname_state: false});
          this.setState({telephone_state: false});
          this.setState({email_state: false});
          this.setState({phone_number_match_state: false});
          
          this.setState({user: null});
        }
      });
    }
  }

  updatePassword(event) {
    event.preventDefault();

    var password = this.refs.password.value.trim();
    var confirm_password = this.refs.confirm_password.value.trim();

    if(!this.refs.password.value.trim()){
      this.setState({password_state: true});
    } else if(confirm_password !== password){
      this.setState({confirm_password_state: true});
    } 
    else {
      Meteor.call('updatePassword', password, (error)=> {
        if(error){
          console.log(error);
        } else {
          Bert.alert('Votre mot de passe a été reinitialisé', 'success');
          this.refs.password.value = '';
          this.refs.confirm_password.value = '';
          this.setState({password_state: false});
          this.setState({confirm_password_state: false});
          browserHistory.push('/');
          Accounts.logout();
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

  onChangeConfirmPassword(event) {
    event.preventDefault();
    var password = this.refs.password.value.trim();
    var confirm_password = this.refs.confirm_password.value.trim();
    if(confirm_password !== password){
      this.setState({confirm_password_state: true});
    } 
    else {
      this.setState({confirm_password_state: false});
    }
  }

  render() {
  	return (
  	  <div>
        <Header />
        <div className="row home">
          <div className="col-sm-12">
            <p className="home-title">
              Profile
              {
                !this.state.user &&
                <a 
                  className="pull-right create-section-button" 
                  onClick={this.loadProfile.bind(this)}>Voir mon profile</a>
              }
            </p>
            <p className="home-branch-title-line"></p>
            {
              this.state.user &&
              <div className="panel panel-default section-panel">
                <div className="panel-heading second-heading">
                  Mettre à jour le profil
                </div>
                <div className="panel-body">
                  <form className="new-user" onSubmit={this.updateProfile.bind(this)}>
                    <div className="section-form-row row">
                      <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="firstname">Prénom</label>
                          <input 
                            type="text" 
                            className={'form-control ' + (this.state.firstname_state ? 'error-input' : '')} 
                            id="firstname"
                            ref="firstname" 
                            defaultValue={this.state.user.profile.firstname}
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
                            defaultValue={this.state.user.profile.lastname}
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
                            defaultValue={this.state.user.profile.telephone}
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
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input 
                            type="text" 
                            className={'form-control ' + (this.state.email_state ? 'error-input' : '')}
                            id="email" 
                            ref="email" 
                            defaultValue={this.state.user.emails[0].address}
                            onChange={this.onChangeEmail.bind(this)}
                            name="email" />
                        </div>
                        {
                          this.state.email_state &&
                          <p className="error-message">Ce champ est obligatoire</p>
                        }
                      </div>                        
                    </div>
                    <button type="submit" className="small-submit-btn">Soumettre</button>
                  </form>
                </div>
              </div>
            }
            <div className="panel panel-default section-panel">
              <div className="panel-heading second-heading">
                Changer le mot de passe
              </div>
              <div className="panel-body">
                <form className="new-user" onSubmit={this.updatePassword.bind(this)}>
                  <div className="section-form-row row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label htmlFor="password">Nouveau mot de passe</label>
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
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label htmlFor="confirm_password">Confirmez le nouveau mot de passe</label>
                        <input 
                          type="password" 
                          className={'form-control ' + (this.state.confirm_password_state ? 'error-input' : '')}
                          id="confirm_password" 
                          ref="confirm_password" 
                          onChange={this.onChangeConfirmPassword.bind(this)}
                          name="confirm_password" />
                      </div>
                      {
                        this.state.confirm_password_state &&
                        <p className="error-message">Ce champ etre identique au mot de passe</p>
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

export default Profile;
