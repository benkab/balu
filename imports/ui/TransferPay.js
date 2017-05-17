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
  cancelTransferPayementMode,
  toggleTransferPayementMode
} from './../store/actions/transferActions';

class TransferPay extends TrackerReact(Component) {

  constructor() {
    super();
    this.state = {
      subscription : {
        branches : Meteor.subscribe('branches'),
        transfers : Meteor.subscribe('transfers')
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
      branch_state: null,
      transfer: null,
      paiement_state: null,
      paiement_is_number_state: null
    }
  }

  componentWillMount() {}

  componentWillUnmount() {
    this._renderComputation.stop();
    this.state.subscription.branches.stop();
    this.state.subscription.transfers.stop();
  }

  cancelEditTransfer(event){
    event.preventDefault();
    this.props.cancelTransferPayementMode(this.props.isPayingTransfer);
  }

  payTransfer(event){
    event.preventDefault();

    const paiement = this.refs.paiement.value.trim();
    const solde = this.props.transferToPay.amount - this.props.transferToPay.amount_paid;
    const deja = this.props.transferToPay.amount_paid;

    if(!paiement){
      this.setState({paiement_state: true});
    } 
    else if(!paiement.match(/^\s*-?[1-9]\d*(\.\d{1,4})?\s*$/))
    {
      this.setState({paiement_state: true});
    }
    else if(paiement > solde)
    {
      this.setState({paiement_state: true});
    }
    else {

      const result = parseInt(paiement) + parseInt(deja);

      const transfer = {
        id: this.props.transferToPay._id,
        amount_paid: result,
        code: this.props.transferToPay.code,
        paiement: parseInt(paiement)
      }

      Meteor.call('payTransfer', transfer, (error, result)=> {
        if(error){
          console.log(error);
        } else {
          Bert.alert('Ce transfert a été payé', 'success');

          this.refs.paiement.value = '';

          this.setState({paiement_state: false});

          this.props.cancelTransferPayementMode(this.props.isPayingTransfer);

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
              Paiement du transfert
            </div>
            <div className="panel-body">
              <form className="new-branch" onSubmit={this.payTransfer.bind(this)}>
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
                        readOnly
                        defaultValue={this.props.transferToPay.sender_firstname}
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
                        readOnly
                        defaultValue={this.props.transferToPay.sender_lastname}
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
                        + (this.state.sender_telephone_state ? 'error-input' : '')
                        + (this.state.sender_phone_number_match_state ? 'error-input' : '')}
                        id="sender_telephone"
                        ref="sender_telephone"
                        readOnly
                        defaultValue={this.props.transferToPay.sender_telephone}
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
                        readOnly
                        defaultValue={this.props.transferToPay.sender_address}
                        ref="sender_address"
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
                        readOnly
                        defaultValue={this.props.transferToPay.receiver_firstname}
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
                        readOnly
                        defaultValue={this.props.transferToPay.receiver_lastname}
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
                        + (this.state.receiver_telephone_state ? 'error-input' : '') 
                        + (this.state.receiver_phone_number_match_state ? 'error-input' : '')}
                        id="receiver_telephone"
                        ref="receiver_telephone"
                        readOnly
                        defaultValue={this.props.transferToPay.receiver_telephone}
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
                        readOnly
                        defaultValue={this.props.transferToPay.receiver_address}
                        ref="receiver_address"
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
                  <div className="col-lg-3 col-md-3 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="amount">Montant en dollards</label>
                      <input 
                        type="text" 
                        className={'form-control '
                        + (this.state.amount_state ? 'error-input' : '') 
                        + (this.state.amount_is_number_state ? 'error-input' : '')}
                        id="amount"
                        readOnly
                        defaultValue={this.props.transferToPay.amount}
                        ref="amount"
                        name="amount" />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="amount">Déjà payés</label>
                      <input 
                        type="text" 
                        className={'form-control '
                        + (this.state.amount_state ? 'error-input' : '') 
                        + (this.state.amount_is_number_state ? 'error-input' : '')}
                        id="amount_paid"
                        readOnly
                        defaultValue={this.props.transferToPay.amount_paid}
                        ref="amount_paid"
                        name="amount_paid" />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="amount">Solde</label>
                      <input 
                        type="text" 
                        className={'form-control '
                        + (this.state.amount_state ? 'error-input' : '') 
                        + (this.state.amount_is_number_state ? 'error-input' : '')}
                        id="solde"
                        readOnly
                        defaultValue={this.props.transferToPay.amount - this.props.transferToPay.amount_paid}
                        ref="solde"
                        name="solde" />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="amount">Paiement</label>
                        <input 
                          type="text" 
                          className={'form-control ' + (this.state.paiement_state ? 'error-input' : '')}
                          id="paiement"
                          onChange={this.onChangePaiement.bind(this)}
                          ref="paiement"
                          name="paiement" />
                    </div>
                    {
                      this.state.paiement_state &&
                      <p className="error-message">Ce champ est obligatoire, doit contenir un montant inferieure ou égal au reste à la solde</p>
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

  onChangePaiement(event) {
    event.preventDefault();
    var paiement = this.refs.paiement.value.trim();
    var solde = this.props.transferToPay.amount - this.props.transferToPay.amount_paid;

    if(!paiement){
      this.setState({paiement_state: true});
    } 
    else if(!paiement.match(/^\s*-?[1-9]\d*(\.\d{1,4})?\s*$/))
    {
      this.setState({paiement_state: true});
    }
    else if(paiement > solde)
    {
      this.setState({paiement_state: true});
    }
    else {
      this.setState({paiement_state: false});
    }
  }

}


function mapStateToProps(state) {
  return {
    isPayingTransfer : state.transferReducer.isPayingTransfer,
    transferToPay: state.transferReducer.transfer.transfer
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    setTransfer: setTransfer, 
    cancelTransferPayementMode: cancelTransferPayementMode,
    toggleTransferPayementMode: toggleTransferPayementMode
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(TransferPay);
