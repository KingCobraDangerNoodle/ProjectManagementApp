import React from 'react';
import Toolbar from './Toolbar.jsx';
import ListGenerator from './ListGenerator.jsx';
import store from '../store.js';
import { findInitialState } from '../slice.js';

const App = (props) => {
  // this should update state from the DB when app renders
  store.dispatch(findInitialState());

  return (
    <div>
      <Toolbar /> 
      <ListGenerator /> 
    </div>
  )
};


export default App;