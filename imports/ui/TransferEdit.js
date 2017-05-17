import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link, browserHistory } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Branches from './../api/Branch';
import Transfers from './../api/Transfer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
  setTransfer,
  cancelTransferEditMode,
  toggleTransferEditMode
} from './../store/actions/transferActions';


class TransferEdit extends TrackerReact(Component) {

  constructor() {
    super();
  }

  componentWillMount() {
    this.state = {
      subscription : {
        branches : Meteor.subscribe('branches')
      },
      sender_firstname_state: null,
      sender_lastname_state: null,
      sender_telephone_state: null,
      sender_address_state: null,
      sender_phone_number_match_state: null,
      receiver_firstname_state: null,
      receiver_lastname_state: null,
      receiver_telephone_state: null,
      receiver_address_state: null,
      receiver_phone_number_match_state: null,
      amount_state: null,
      amount_is_number_state: null,
      branch_state: null
    }
  }

  componentWillUnmount() {
    this._renderComputation.stop();
    this.state.subscription.branches.stop();
  }

  cancelEditTransfer(event){
    event.preventDefault();
    this.props.cancelTransferEditMode(this.props.isEditingTransfer);
  }

  updateTransfer(event){
    event.preventDefault();

    var sender_firstname = this.refs.sender_firstname.value.trim();
    var sender_lastname = this.refs.sender_lastname.value.trim();
    var sender_telephone = this.refs.sender_telephone.value.trim();
    var sender_address = this.refs.sender_address.value.trim();
    var receiver_firstname = this.refs.receiver_firstname.value.trim();
    var receiver_lastname = this.refs.receiver_lastname.value.trim();
    var receiver_telephone = this.refs.receiver_telephone.value.trim();
    var receiver_address = this.refs.receiver_address.value.trim();
    var amount = this.refs.amount.value.trim();
    var branch = this.refs.branch.value.trim();

    const transfer = {
      id: this.props.transferToEdit.transfer._id,
      sender_firstname: sender_firstname,
      sender_lastname: sender_lastname,
      sender_telephone: sender_telephone,
      sender_address: sender_address,
      receiver_firstname: receiver_firstname,
      receiver_lastname: receiver_lastname,
      receiver_telephone: receiver_telephone,
      receiver_address: receiver_address,
      amount: amount,
      branch: branch,
      code: 'test'
    }

    const phonenumber = /^\d{10}$/;

    if(!sender_firstname){
      this.setState({sender_firstname_state: true});
    } 
    else if(!sender_lastname){
      this.setState({sender_lastname_state: true});
    } 
    else if(!sender_telephone){
      this.setState({sender_telephone_state: true});
    } 
    else if(!sender_telephone.match(phonenumber)){
      this.setState({sender_phone_number_match_state: true});
    } 
    else if(!sender_address){
      this.setState({sender_address_state: true});
    } 
    else if(!receiver_firstname){
      this.setState({receiver_firstname_state: true});
    } 
    else if(!receiver_lastname){
      this.setState({receiver_lastname_state: true});
    } 
    else if(!receiver_telephone){
      this.setState({receiver_telephone_state: true});
    } 
    else if(!receiver_telephone.match(phonenumber)){
      this.setState({receiver_phone_number_match_state: true});
    } 
    else if(!receiver_address){
      this.setState({receiver_address_state: true});
    } 
    else if(!amount){
      this.setState({amount_state: true});
    } 
    else if(!amount.match(/^\s*-?[1-9]\d*(\.\d{1,4})?\s*$/)){
      this.setState({amount_is_number_state: true});
    }
    else if(branch === 'null'){
      this.setState({branch_state: true});
    } 
    else {
      Meteor.call('updateTransfer', transfer, (error, result)=> {
        if(error){
          console.log(error);
        } else {
          Bert.alert('Ce transfert a été mis à jour', 'success');

          this.refs.sender_firstname.value = '';
          this.refs.sender_lastname.value = '';
          this.refs.sender_telephone.value = '';
          this.refs.sender_address.value = '';

          this.refs.receiver_firstname.value = '';
          this.refs.receiver_lastname.value = '';
          this.refs.receiver_telephone.value = '';
          this.refs.receiver_address.value = '';

          this.refs.amount.value = '';
          this.refs.branch.value = 'null';

          this.setState({sender_firstname_state: false});
          this.setState({sender_lastname_state: false});
          this.setState({sender_telephone_state: false});
          this.setState({sender_address_state: false});

          this.setState({receiver_firstname_state: false});
          this.setState({receiver_lastname_state: false});
          this.setState({receiver_telephone_state: false});
          this.setState({receiver_address_state: false});
          this.setState({receiver_phone_number_match_state: false});
          this.setState({sender_phone_number_match_state: false});
          this.setState({amount_is_number_state: false});

          this.setState({amount_state: false});
          this.setState({branch_state: false});

          this.props.cancelTransferEditMode(this.props.isEditingTransfer);

        }
      });
    }

  }

  branches() {
    return Branches.find().fetch();
  }

  render() {
  	return (
      <div className="row home">
        <div className="col-sm-12">
          <p className="home-title">
            Transferts
            <a className="pull-right create-section-button" onClick={this.cancelEditTransfer.bind(this)}>Voir les transferts</a>
          </p>
          <p className="home-branch-title-line"></p>
          <div className="panel panel-default section-panel">
            <div className="panel-heading second-heading">
              Modifier un transfert
            </div>
            <div className="panel-body">
              <form className="new-branch" onSubmit={this.updateTransfer.bind(this)}>
                <div className="row section-form-title">
                  Expéditeur
                </div>
                <div className="section-form-row row">
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="sender_firstname">Prenom</label>
                      <input 
                        type="text" 
                        className={'form-control ' + (this.state.sender_firstname_state ? 'error-input' : '')}
                        id="sender_firstname"
                        onChange={this.onChangeSenderFirstname.bind(this)}
                        defaultValue={this.props.transferToEdit.transfer.sender_firstname}
                        ref="sender_firstname"
                        name="sender_firstname" />
                    </div>
                    {
                      this.state.sender_firstname_state &&
                      <p className="error-message">Ce champ est obligatoire</p>
                    }
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="sender_lastname">Nom</label>
                      <input 
                        type="text" 
                        className={'form-control ' + (this.state.sender_lastname_state ? 'error-input' : '')}
                        id="sender_lastname"
                        onChange={this.onChangeSenderLastname.bind(this)}
                        defaultValue={this.props.transferToEdit.transfer.sender_lastname}
                        ref="sender_lastname"
                        name="lsender_astname" />
                    </div>
                    {
                      this.state.sender_lastname_state &&
                      <p className="error-message">Ce champ est obligatoire</p>
                    }
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="sender_telephone">Telephone</label>
                      <input 
                        type="text" 
                        className={'form-control ' 
                        + (this.state.sender_telephone_state ? 'error-input' : '')}
                        id="sender_telephone"
                        onChange={this.onChangeSenderTelelephone.bind(this)}
                        ref="sender_telephone"
                        defaultValue={this.props.transferToEdit.transfer.sender_telephone}
                        name="sender_telephone" />
                    </div>
                    {
                      (this.state.sender_telephone_state || this.state.sender_phone_number_match_state) &&
                      <p className="error-message">Ce champ est obligatoire et doit container un numero valide</p>
                    }
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="sender_address">Addresse</label>
                      <input 
                        type="text" 
                        className={'form-control ' + (this.state.sender_address_state ? 'error-input' : '')}
                        id="sender_address"
                        onChange={this.onChangeSenderAddress.bind(this)}
                        ref="sender_address"
                        defaultValue={this.props.transferToEdit.transfer.sender_address}
                        name="sender_address" />
                    </div>
                    {
                      this.state.sender_address_state &&
                      <p className="error-message">Ce champ est obligatoire</p>
                    }
                  </div>
                </div>
                <div className="row section-form-title">
                  Destinateur
                </div>
                <div className="section-form-row row">
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="receiver_firstname">Prenom</label>
                      <input 
                        type="text" 
                        className={'form-control ' + (this.state.receiver_firstname_state ? 'error-input' : '')}
                        id="receiver_firstname"
                        ref="receiver_firstname"
                        onChange={this.onChangeReceiverFirstname.bind(this)}
                        defaultValue={this.props.transferToEdit.transfer.receiver_firstname}
                        name="receiver_firstname" />
                    </div>
                    {
                      this.state.receiver_firstname_state &&
                      <p className="error-message">Ce champ est obligatoire</p>
                    }
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="receiver_lastname">Nom</label>
                      <input 
                        type="text" 
                        className={'form-control ' + (this.state.receiver_lastname_state ? 'error-input' : '')}
                        id="receiver_lastname"
                        ref="receiver_lastname"
                        defaultValue={this.props.transferToEdit.transfer.receiver_lastname}
                        onChange={this.onChangeReceiverLastname.bind(this)}
                        name="receiver_lastname" />
                    </div>
                    {
                      this.state.receiver_lastname_state &&
                      <p className="error-message">Ce champ est obligatoire</p>
                    }
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="receiver_telephone">Telephone</label>
                      <input 
                        type="text" 
                        className={'form-control ' 
                        + (this.state.receiver_telephone_state ? 'error-input' : '')}
                        id="receiver_telephone"
                        ref="receiver_telephone"
                        defaultValue={this.props.transferToEdit.transfer.receiver_telephone}
                        onChange={this.onChangeReceiverTelelephone.bind(this)}
                        name="receiver_telephone" />
                    </div>
                    {
                      (this.state.receiver_telephone_state || this.state.receiver_phone_number_match_state) &&
                      <p className="error-message">Ce champ est obligatoire et doit container un numero valide</p>
                    }
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="receiver_address">Addresse</label>
                      <input 
                        type="text" 
                        className={'form-control ' + (this.state.receiver_address_state ? 'error-input' : '')}
                        id="receiver_address"
                        ref="receiver_address"
                        defaultValue={this.props.transferToEdit.transfer.receiver_address}
                        onChange={this.onChangeReceiverAddress.bind(this)}
                        name="receiver_address" />
                    </div>
                    {
                      this.state.receiver_address_state &&
                      <p className="error-message">Ce champ est obligatoire</p>
                    }
                  </div>
                </div>
                <div className="row section-form-title">
                  Details du transfert
                </div>
                <div className="section-form-row row">
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="amount">Montant en dollards</label>
                      <input 
                        type="text" 
                        className={'form-control '
                        + (this.state.amount_state ? 'error-input' : '') 
                        + (this.state.amount_is_number_state ? 'error-input' : '')}
                        id="amount"
                        onChange={this.onChangeAmount.bind(this)}
                        defaultValue={this.props.transferToEdit.transfer.amount}
                        ref="amount"
                        name="amount" />
                    </div>
                    {
                      (this.state.amount_state || this.state.amount_is_number_state) &&
                      <p className="error-message">Ce champ est obligatoire et doit container un numbre valide</p>
                    }
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="branch">Branche de la destination</label>
                        <div className={'select-enclosure ' + (this.state.branch_state ? 'error-input' : '')}>
                          <select
                            type="text" 
                            className="form-control"
                            id="branch" 
                            ref="branch"
                            defaultValue={this.props.transferToEdit.transfer.destination_branch}
                            onChange={this.onChangeBranch.bind(this)}
                            name="branch">
                            <option value="null">Choisir une branche</option>
                            {this.branches().map( (branch) => {
                               return <option key={branch._id} value={branch._id}>{branch.description}</option>
                            })}
                          </select>
                        </div>
                    </div>
                    {
                      this.state.branch_state &&
                      <p className="error-message">Ce champ est obligatoire</p>
                    }
                  </div>
                </div>
                <button type="submit" className="small-submit-btn">Soumettre</button>
                <a type="button" className="isEditingCancelButton" onClick={this.cancelEditTransfer.bind(this)}>Annuler</a>
              </form>
            </div>
          </div>
        </div>
      </div>
  	)
  }

  onChangeSenderFirstname(event) {
    event.preventDefault();
    var sender_firstname = this.refs.sender_firstname.value.trim();
    if(!sender_firstname){
      this.setState({sender_firstname_state: true});
    } 
    else {
      this.setState({sender_firstname_state: false});
    }
  }

  onChangeSenderLastname(event) {
    event.preventDefault();
    var sender_lastname = this.refs.sender_lastname.value.trim();
    if(!sender_lastname){
      this.setState({sender_lastname_state: true});
    } 
    else {
      this.setState({sender_lastname_state: false});
    }
  }

  onChangeSenderTelelephone(event) {
    event.preventDefault();
    const phonenumber = /^\d{10}$/;
    var sender_telephone = this.refs.sender_telephone.value.trim();
    if(!sender_telephone){
      this.setState({sender_telephone_state: true});
      this.setState({sender_phone_number_match_state: true});
    } 
    else if(!sender_telephone.match(phonenumber)) {
      this.setState({sender_telephone_state: true});
      this.setState({sender_phone_number_match_state: true});
    }
    else {
      this.setState({sender_telephone_state: false});
      this.setState({sender_phone_number_match_state: false});
    }
  }

  onChangeSenderAddress(event) {
    event.preventDefault();
    var sender_address = this.refs.sender_address.value.trim();
    if(!sender_address){
      this.setState({sender_address_state: true});
    } 
    else {
      this.setState({sender_address_state: false});
    }
  }

  onChangeReceiverFirstname(event) {
    event.preventDefault();
    var receiver_firstname = this.refs.receiver_firstname.value.trim();
    if(!receiver_firstname){
      this.setState({receiver_firstname_state: true});
    } 
    else {
      this.setState({receiver_firstname_state: false});
    }
  }

  onChangeReceiverLastname(event) {
    event.preventDefault();
    var receiver_lastname = this.refs.receiver_lastname.value.trim();
    if(!receiver_lastname){
      this.setState({receiver_lastname_state: true});
    } 
    else {
      this.setState({receiver_lastname_state: false});
    }
  }

  onChangeReceiverTelelephone(event) {
    event.preventDefault();
    const phonenumber = /^\d{10}$/;
    var receiver_telephone = this.refs.receiver_telephone.value.trim();
    if(!receiver_telephone){
      this.setState({receiver_telephone_state: true});
      this.setState({receiver_phone_number_match_state: true});
    } 
    else if(!receiver_telephone.match(phonenumber)) {
      this.setState({receiver_telephone_state: true});
      this.setState({receiver_phone_number_match_state: true});
    }
    else {
      this.setState({receiver_telephone_state: false});
      this.setState({receiver_phone_number_match_state: false});
    }
  }

  onChangeReceiverAddress(event) {
    event.preventDefault();
    var receiver_address = this.refs.receiver_address.value.trim();
    if(!receiver_address){
      this.setState({receiver_address_state: true});
    } 
    else {
      this.setState({receiver_address_state: false});
    }
  }

  onChangeAmount(event) {
    event.preventDefault();
    var amount = this.refs.amount.value.trim();
    if(!amount){
      this.setState({amount_state: true});
    } 
    else {
      if(!amount.match(/^\s*-?[1-9]\d*(\.\d{1,4})?\s*$/)){
        this.setState({amount_is_number_state: true});
      } else {
        this.setState({amount_state: false});
        this.setState({amount_is_number_state: false});
      }
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

}


function mapStateToProps(state) {
  return {
    isEditingTransfer : state.transferReducer.isEditingTransfer,
    transferToEdit: state.transferReducer.transfer
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    setTransfer: setTransfer, 
    cancelTransferEditMode: cancelTransferEditMode,
    toggleTransferEditMode: toggleTransferEditMode
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(TransferEdit);
