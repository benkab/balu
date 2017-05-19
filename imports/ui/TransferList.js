import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import TransferItem from './TransferItem';
import Transfers from './../api/Transfer';

class TransferList extends TrackerReact(Component) {

  constructor() {
    super();
    this.state = {
      subscription : {
        users : Meteor.subscribe('users')
      },
      filterTerm: null,
      filteredTransfers: [] 
    }
  }

  componentWillUnmount() {
    this._renderComputation.stop();
    Meteor.subscribe('users').stop();
  }

  filterTransfers(){
    const term = this.refs.search.value.trim();
    if(term){
      this.setState({filterTerm: term})
      const transfers = Transfers.find(
        {code: 
          { $regex: new RegExp("^" + term.toLowerCase(), "i") }
        }
      );
      this.setState({filteredTransfers: transfers})
    } else {
      this.setState({filterTerm: null})
      this.setState({filteredTransfers: []})
    }
  }

  transfers() {
    return Transfers.find().fetch();
  } 

  render() {
  	return (
      <div>
        <div className="panel-body">
          <div className="table-header row">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <p><b>Expediteur</b></p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <p><b>Destinateur</b></p>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12">
              <p><b>Details</b></p>
            </div>
            <div className="col-lg-1 col-md-1 col-sm-12">
            </div>
          </div>
          {
            !this.state.filterTerm &&
             <div>
               {this.transfers().map( (transfer) => {
                  return <TransferItem key={transfer._id} transfer={transfer} />
               })}
             </div>
          }
          {
            (this.state.filterTerm && this.state.filteredTransfers) &&
            <div>
              {this.state.filteredTransfers.map( (transfer) => {
                return <TransferItem key={transfer._id} transfer={transfer} />
              })}
            </div>
          }
          <div className="row footer-container">
            <div className="col-lg-2 col-md-3 col-sm-12 footer-search-container">
              <div className="form-group">
                <input 
                  type="text" 
                  className="form-control filter" 
                  id="search" 
                  ref="search" 
                  name="search" 
                  placeholder="Recherche par code"
                  onChange={this.filterTransfers.bind(this)} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  	)
  }

}

export default TransferList;
