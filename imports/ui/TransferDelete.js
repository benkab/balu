import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
  setTransfer,
  toggleTransferDeleteMode,
  cancelTransferDeleteMode
} from './../store/actions/transferActions';

class TransferDelete extends TrackerReact(Component) {

  constructor() {
    super();
  }

  cancelDeletion (event){
  	event.preventDefault();
  	this.props.setTransfer(null);
    this.props.cancelTransferDeleteMode(null);
  }

  deleteTransfer (event){
    event.preventDefault();
    const id = this.props.transferToBeDeleted.transfer._id;
    if(id){
      Meteor.call('deleteTransfer', id, (error)=> {
        if(error){
          console.log(error);
        } else {
          this.props.setTransfer(null);
          this.props.cancelTransferDeleteMode(null);
          Bert.alert('Ce transfert a été supprimé', 'success');
        }
      });
    }
  }

  render() {
  	return (
      <div>
      {
        (this.props.isDeletingTransfer.isDeletingTransfer) && 
        <div className="confirmDeletion">
          <p>Confirmez vous la suppression de ce transfert?</p>
          <ul>
            <li onClick={this.deleteTransfer.bind(this)}>Supprimer</li>
            <li className="annuler" onClick={this.cancelDeletion.bind(this)}>Annuler</li>
          </ul>
        </div>
      }
      </div>
  	)
  }

}

function mapStateToProps(state) {
  return {
    isDeletingTransfer : state.transferReducer.isDeletingTransfer,
    transferToBeDeleted : state.transferReducer.transfer
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    setTransfer: setTransfer, 
    toggleTransferDeleteMode: toggleTransferDeleteMode,
    cancelTransferDeleteMode: cancelTransferDeleteMode
  }, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(TransferDelete);
