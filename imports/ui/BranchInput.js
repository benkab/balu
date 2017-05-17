import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { cancelEditMode, setBranch } from './../store/actions/branchActions';

class BranchInput extends Component {

  constructor() {
    super();

    this.state = {
      addDescription : null,
      updateDescription: null
    }
  }

  onChangeDescriptionUpdate(event) {
    event.preventDefault();
    var description = this.refs.branchEdit.value.trim();
    if(!description){
      this.setState({updateDescription: true});
    } else {
      this.setState({updateDescription: false});
    }
  }

  onChangeDescription(event) {
    event.preventDefault();
    var description = this.refs.branch.value.trim();
    if(!description){
      this.setState({addDescription: true});
    } else {
      this.setState({addDescription: false});
    }
  }

  addBranch (event) {
    event.preventDefault();
    var description = this.refs.branch.value.trim();
    if(description){
      if((typeof description) === 'string') {
        Meteor.call('addBranch', description, (error, result)=> {
          if(error){
            console.log(error);
          } else {
            if(result === 'Existing'){
              Bert.alert('Cette branche existe déjà', 'danger');
            } else {
              Bert.alert('Une nouvelle branche a été ajoutée', 'success');
              this.refs.branch.value = '';
            }
          }
        });
      }
      else{
        Bert.alert('le champ description ne peut pas contenir que des lettres', 'danger');
      }
    } else{
      this.setState({addDescription: true});
    }
  }

  updateBranch (event) {
    event.preventDefault();
    var id = this.props.branchToBeEdited.branch._id;
    var description = this.refs.branchEdit.value.trim();

    const branch = {
      id: id,
      description: description
    }

    if(description){
      Meteor.call('updateBranch', branch, (error)=> {
        if(error){
          console.log(error);
        } else {
          Bert.alert('La branche a été mise à jour', 'success');
          this.props.cancelEditMode(this.props.isEditing);
          this.props.setBranch(null);
        }
      });
    } else{
      this.setState({updateDescription: true});
    }
  }

  cancelEditBranch (event) {
    event.preventDefault();
    this.props.setBranch(null);
    this.setState({updateDescription: false});
    this.props.cancelEditMode(this.props.isEditing);
  }

  render() {
  	return (
        <div className="panel panel-default">
          {
            !this.props.isEditing.isEditing &&
            <div>
              <div className="panel-heading">
                Ajouter une branche
              </div>
              <div className="panel-body">
                <form className="new-branch" onSubmit={this.addBranch.bind(this)}>
                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <input 
                        type="text" 
                        className={'form-control ' + (this.state.addDescription ? 'error-input' : '')}
                        id="branchDescription"
                        onChange={this.onChangeDescription.bind(this)}
                        ref="branch"
                        name="description" />
                    </div>
                    {
                      this.state.addDescription &&
                      <p className="error-message">Ce champ est obligatoire</p>
                    }
                    <button type="submit" className="btn btn-success btn-block">Soumettre</button>
                </form>
              </div>
            </div>
          }
          {
            this.props.isEditing.isEditing &&
            <div>
              <div className="panel-heading">
                Mettre la branche à jour
              </div>
              <div className="panel-body">
                <form className="new-branch" onSubmit={this.updateBranch.bind(this)}>
                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <input
                        type="text" 
                        className={'form-control ' + (this.state.updateDescription ? 'error-input' : '')}
                        id="branchToEditDescription" 
                        ref="branchEdit"
                        onChange={this.onChangeDescriptionUpdate.bind(this)}
                        defaultValue={this.props.branchToBeEdited.branch.description}
                        name="branchToEditDescription" />
                    </div>
                    {
                      this.state.updateDescription &&
                      <p className="error-message">Ce champ est obligatoire</p>
                    }
                    <button type="submit" className="btn btn-success btn-block">Soumettre</button>
                    <p className="cancelEditing">
                      <a type="button" className="btn btn-block" onClick={this.cancelEditBranch.bind(this)}>Annuler</a>
                    </p>
                </form>
              </div>
            </div>
          }
        </div>
  	)
  }

}

function mapStateToProps(state) {
  return {
    isEditing : state.branchReducer.isEditing,
    branchToBeEdited: state.branchReducer.branch
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    cancelEditMode: cancelEditMode,
    setBranch: setBranch
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(BranchInput);
