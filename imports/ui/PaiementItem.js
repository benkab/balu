import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link, browserHistory } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Icon from 'react-ionicons';
import Transfers from './../api/Transfer';
import Branches from './../api/Branch';
import Users from './../api/User';
import Moment from 'react-moment';
import PDF from 'jspdf';


class PaiementItem extends TrackerReact(Component) {

  constructor() {
    super();
    this.state = {
      item: null
    }
  }

  displayDetails(){
    if(this.props.paiement.type === "Transfert"){
      const transfer = Transfers.findOne({_id: this.props.paiement.item});
      const originBranch = Branches.findOne({_id: transfer.origine_branch});
      const destinationBranch = Branches.findOne({_id: transfer.destination_branch});
      const user = Users.findOne({_id: transfer.user});

      const item = {
        _id: transfer._id,
        sender_firstname: transfer.sender_firstname,
        sender_lastname: transfer.sender_lastname,
        sender_telephone: transfer.sender_telephone,
        origin: originBranch.description,
        destination: destinationBranch.description,
        receiver_firstname: transfer.receiver_firstname,
        receiver_lastname: transfer.receiver_lastname,
        receiver_telephone: transfer.receiver_telephone,
        amount: transfer.amount,
        amount_paid: transfer.amount_paid,
        user: user
      }
      this.setState({item: item})
    }
  }

  hideDetails(){
    this.setState({item: null})
  }

  print(){
    let doc = new PDF();
    doc.setFontSize(13);
    doc.setLineWidth(0.1)
    doc.line(20, 25, 80, 25);
    doc.text(20, 20, 'Facture');
    doc.save('tedsddt.pdf');
  }

  render(props) {
  	return (
      <div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
          <div className="panel panel-default paiement-panel">
            <div className="panel-body">
              <p className="paiement-title">{this.props.paiement.type}</p>
              <br />
              <span>CODE : <b>{this.props.paiement.code}</b></span>
              <br />
              <span>Paiement : <b>{this.props.paiement.amount} Dollars</b></span>
              <br />
              <p className="text-right">
                <Moment format="DD/MM/YYYY">{this.props.paiement.createdAt}</Moment>
              </p>
              <button className="details-button" onClick={this.displayDetails.bind(this)}>Details</button>
              <button className="paiement-button" onClick={this.print.bind(this)}>Imprimer</button>
            </div>
            {
              this.state.item &&
              <div className="paiement-overlay">
                <div className="col-sm-5 col-xs-5">
                  <p className="paiement-title">
                    <span><b>Expéditeur</b></span>
                  </p>
                  <span>{this.state.item.sender_firstname} {this.state.item.sender_lastname}</span>
                  <br />
                  <span>{this.state.item.sender_telephone}</span>
                  <br />
                  <span>{this.state.item.origin}</span>
                </div>
                <div className="col-sm-2 col-xs-2 text-center">
                  <span className="close-paiement-overlay" onClick={this.hideDetails.bind(this)}>
                    <Icon icon="ion-ios-close-outline" fontSize="22px" color="#616161" />
                  </span>
                </div>
                <div className="col-sm-5 col-xs-5 text-right">
                  <p className="paiement-title">
                    <span><b>Destinateur</b></span>
                  </p>
                  <span>{this.state.item.receiver_firstname} {this.state.item.receiver_lastname}</span>
                  <br />
                  <span>{this.state.item.receiver_telephone}</span>
                  <br />
                  <span>{this.state.item.destination}</span>
                </div>
                <div className="col-sm-12 paiement-amount">
                  <p className="paiement-title">
                    <span><b>Details du transfert</b></span>
                  </p>
                  <span>Montant : <b>{this.state.item.amount} Dollars</b></span>
                  <br />
                  <span>Dernier paiement: <b>{this.props.paiement.amount} Dollars</b></span>
                  <br />
                  <span>Montant déja payé: <b>{this.state.item.amount_paid} Dollars</b></span>
                  <br />
                  <span>Reste à payer: <b>{this.state.item.amount - this.state.item.amount_paid} Dollars</b></span>
                  <br />
                </div>
                {
                  this.state.item.user &&
                  <div className="col-sm-12">
                    <span>Par <b>{this.state.item.user.profile.firstname} {this.state.item.user.profile.lastname}</b></span>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </div>
  	)
  }
}

export default PaiementItem;

