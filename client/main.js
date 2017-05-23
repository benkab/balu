import { Meteor } from 'meteor/meteor';
import React from 'react'; 
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import Signin from '../imports/ui/Signin';
import Home from '../imports/ui/Home';
import Profile from '../imports/ui/Profile';
import Parking from '../imports/ui/Parking';
import Log from '../imports/ui/Log';
import User from '../imports/ui/User';

import { Provider } from 'react-redux';
import store from './../imports/store';

const unauthenticatedPages = [
  '/'
];
const authenticatedPages = [
  '/home', 
  '/profile', 
  '/parkings',
  '/logs',
  '/users'
];
const onEnterPublicPage = () => {
  if(Meteor.userId()){
  	browserHistory.replace('/home');
  }
};
const onEnterPrivatePage = () => {
  if(!Meteor.userId()){
  	browserHistory.replace('/');
  }
};

const routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Signin} onEnter={onEnterPublicPage}/>
      <Route path="/parkings" component={Parking} onEnter={onEnterPrivatePage}/>
      <Route path="/logs" component={Log} onEnter={onEnterPrivatePage}/>
      <Route path="/users" component={User} onEnter={onEnterPrivatePage}/>
      <Route path="/home" component={Home} onEnter={onEnterPrivatePage}/>
      <Route path="/profile" component={Profile} onEnter={onEnterPrivatePage}/>
    </Router>
  </Provider>
);

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});

Tracker.autorun(() => {

  const isAuthenticated 		= !!Meteor.userId();
  const pathname 				= browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage 	= unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage 	= authenticatedPages.includes(pathname);

  if(isUnauthenticatedPage && isAuthenticated){
  	browserHistory.replace('/home');
  } else if (isAuthenticatedPage && !isAuthenticated) {
  	browserHistory.replace('/');
  }
  
});
