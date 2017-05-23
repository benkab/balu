import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link, browserHistory } from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Header from './Header';

class ParkingInput extends TrackerReact(Component) {

  constructor() {
    super();
  }

  componentWillMount() {
    this.state = {
      description: null,
      latitude: null,
      longitude: null
    }
  }

  addParking(event){
    event.preventDefault();

    var description = this.refs.description.value.trim();
    var latitude = this.refs.latitude.value.trim();
    var longitude = this.refs.longitude.value.trim();

    const parking = {
      description: description,
      latitude: latitude,
      longitude: longitude
    }

    if(!description){
      this.setState({description: true});
    } 
    else if(!latitude){
      this.setState({latitude: true});
    } 
    else if(!longitude){
      this.setState({longitude: true});
    } 
    else {
      Meteor.call('addParking', parking, (error, result)=> {
        if(error){
          console.log(error);
        } else {
          if(result === 'Existing'){
            Bert.alert('You have entered an existing parking description', 'danger');
          } else {
            Bert.alert('You have added a new parking', 'success');

            this.refs.description.value = '';
            this.refs.latitude.value = '';
            this.refs.longitude.value = '';

            this.setState({description: false});
            this.setState({latitude: false});
            this.setState({longitude: false});
          }
        }
      });
    }
  }


  render() {
  	return (
      <div>
        <div className="col-sm-12">
          <div className="panel panel-default section-panel">
            <div className="panel-heading second-heading">
              Adding a parking
            </div>
            <div className="panel-body">
              <form className="new-branch" onSubmit={this.addParking.bind(this)}>
                <div className="section-form-row row">
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <input 
                        type="text" 
                        className={'form-control ' + (this.state.description ? 'error-input' : '')}
                        id="description"
                        onChange={this.onChangeDescription.bind(this)}
                        ref="description"
                        name="description" />
                    </div>
                    {
                      this.state.description &&
                      <p className="error-message">This field is required</p>
                    }
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="latitude">Latitude</label>
                      <input 
                        type="text" 
                        className={'form-control ' + (this.state.latitude ? 'error-input' : '')}
                        id="latitude"
                        onChange={this.onChangeLatitude.bind(this)}
                        ref="latitude"
                        name="latitude" />
                    </div>
                    {
                      this.state.latitude &&
                      <p className="error-message">This field is required</p>
                    }
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="longitude">Longitude</label>
                      <input 
                        type="text" 
                        className={'form-control ' + (this.state.longitude ? 'error-input' : '')}
                        id="longitude"
                        onChange={this.onChangeLongitude.bind(this)}
                        ref="longitude"
                        name="longitude" />
                    </div>
                    {
                      this.state.longitude &&
                      <p className="error-message">This field is required</p>
                    }
                  </div>
                </div>
                <button type="submit" className="small-submit-btn">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
  	)
  }

  onChangeDescription(event) {
    event.preventDefault();
    var description = this.refs.description.value.trim();
    if(!description){
      this.setState({description: true});
    } 
    else {
      this.setState({description: false});
    }
  }

  onChangeLatitude(event) {
    event.preventDefault();
    var latitude = this.refs.latitude.value.trim();
    if(!latitude){
      this.setState({latitude: true});
    } 
    else {
      this.setState({latitude: false});
    }
  }

  onChangeLongitude(event) {
    event.preventDefault();
    var longitude = this.refs.longitude.value.trim();
    if(!longitude){
      this.setState({longitude: true});
    } 
    else {
      this.setState({longitude: false});
    }
  }

}

export default ParkingInput;
