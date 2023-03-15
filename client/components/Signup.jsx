// import statements/
import React from 'react';
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from 'axios'

// define Signup component
const Signup = (props) => {
  const navigate = useNavigate();
  // define onClick functionality for the signup function
  const signupAndLogin = async () => {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    const requestBody = { username, password };
    const data = await axios.post('/signup', requestBody)
      .then((response) => {
        if(response.status === 200) {
          navigate({
            pathname: '/home',
            search: `?username=${username}`});
        }});

3

  };

  // render signup fields and buttons
  return (
    <div className="login">
      <h1>Sign Up</h1>
      <input type='text'
          placeholder='Username'
          id='signupUsername'
      />
      <input type='text'
          placeholder='Password'
          id='signupPassword'
      />
      <button onClick={signupAndLogin}>Sign Up</button>
      <span><Link to='/'>Already have an account? Log In</Link></span>
    </div>
  )
} 

export default Signup;
