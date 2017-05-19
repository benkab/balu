import { Meteor } from 'meteor/meteor';
import React from 'react'; 
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import Signup from '../imports/ui/Signup';
import Signin from '../imports/ui/Signin';
import Home from '../imports/ui/Home';
import Transfer from '../imports/ui/Transfer';
import Paiement from '../imports/ui/Paiement';
import TransferCreate from '../imports/ui/TransferCreate';
import Profile from '../imports/ui/Profile';

import { Provider } from 'react-redux';
import store from './../imports/store';

import Notifications from '../imports/api/Notification';

const unauthenticatedPages = ['/'];
const authenticatedPages = [
  '/home', 
  '/transfers', 
  '/transfers/create', 
  '/paiements', 
  '/signup',
  '/profile'
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
      <Route path="/signup" component={Signup} onEnter={onEnterPrivatePage}/>
      <Route path="/home" component={Home} onEnter={onEnterPrivatePage}/>
      <Route path="/transfers" component={Transfer} onEnter={onEnterPrivatePage}/>
      <Route path="/paiements" component={Paiement} onEnter={onEnterPrivatePage}/>
      <Route path="/transfers/create" component={TransferCreate} onEnter={onEnterPrivatePage}/>
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

  Streamy.on('notify', function(d, s) {
    if(d.data === Meteor.user().profile.branch){
      Bert.alert('Vous avez une nouvelle notification', 'info', 'growl-bottom-left');
    }
  });

  Meteor.subscribe('notifications')

  // count notification
  if(Meteor.userId()){

  }
  
});
