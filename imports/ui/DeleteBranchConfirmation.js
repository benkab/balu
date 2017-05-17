import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setBranch } from './../store/actions/branchActions';
import './../styles/delete.css';

class DeleteConfirmation extends TrackerReact(Component) {

  constructor() {
    super();
  }

  cancelDeletion (event){
  	event.preventDefault();
  	this.props.setBranch(null)
  }

  deleteBranch (event){
    event.preventDefault();
    var id = this.props.selectedBranch.branch;
    if(id){
      Meteor.call('deleteBranch', id, (error)=> {
        if(error){
          console.log(error);
        } else {
          this.props.setBranch(null);
          Bert.alert('Cette branche a été supprimée', 'success');
        }
      });
    }
  }

  render() {
    
  	return (
      <div>
      {
        (this.props.selectedBranch.branch && !this.props.isEditing.isEditing) && 
        <div className="confirmDeletion">
          <p>Confirmez vous la suppression de cette branche?</p>
          <ul>
            <li onClick={this.deleteBranch.bind(this)}>Supprimer</li>
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
    isEditing : state.branchReducer.isEditing,
    selectedBranch :state.branchReducer.branch
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({setBranch: setBranch}, dispatch)
}



export default connect(mapStateToProps, matchDispatchToProps)(DeleteConfirmation);
