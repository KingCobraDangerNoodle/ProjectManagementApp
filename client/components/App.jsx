import React from 'react';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Home from './Home.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

 export default function App (props) {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        {/* This is commented out so only login and home render */}
        {/* <Route path='/signup' element={<Signup />} /> */}
        <Route path='/home' element={<Home />} />
      </Routes>
    </ Router>
  );
};
