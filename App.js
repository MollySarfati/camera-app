import React, { Component } from 'react';

import userData from './reducers/user.reducer';

import {Provider } from 'react-redux';
import {createStore, combineReducers}  from 'redux';


const store = createStore(combineReducers({ userData}));

import Navigation from './components/Navigation';

export default class App extends Component {
  render() {

  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
  );
}
}
