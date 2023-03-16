// import statements
import React, { useState } from 'react';
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import ReactDOM from 'react-dom/client';
import store from './store.js';
import { Provider } from 'react-redux';
import './styles.scss';

// define our parent component Routing, which will route users to different components based on URI endpoints
const Routing = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

// hang our app at the root element
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Routing />);
