import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Parkings from './../api/Parking';
import ParkingItem from './ParkingItem';

class ParkingList extends TrackerReact(Component) {

  constructor() {
    super();
    this.state = {
      filterTerm: null,
      filtered_parkings: [] 
    }
  }

  filterParkings(){
    const term = this.refs.search.value.trim();
    if(term){
      this.setState({filterTerm: term})
      const parkings = Parkings.find(
        {description: 
          { $regex: new RegExp("^" + term.toLowerCase(), "i") }
        }
      );
      this.setState({filtered_parkings: parkings})
    } else {
      this.setState({filterTerm: null})
      this.setState({filtered_parkings: []})
    }
  }

  parkings() {
    return Parkings.find().fetch();
  } 

  render() {
  	return (
      <div>
        <div className="panel-body">
          <div className="table-header row">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <p><b>Description</b></p>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12">
              <p><b>Location</b></p>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12">
              <p><b>Latitude</b></p>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-12">
            </div>
          </div>
          {
            !this.state.filterTerm &&
             <div>
               {this.parkings().map( (parking) => {
                  return <ParkingItem key={parking._id} parking={parking} />
               })}
             </div>
          }
          {
            (this.state.filterTerm && this.state.filtered_parkings) &&
            <div>
              {this.state.filtered_parkings.map( (parking) => {
                return <ParkingItem key={parking._id} parking={parking} />
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
                  placeholder="Search by description"
                  onChange={this.filterParkings.bind(this)} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  	)
  }

}

export default ParkingList;
