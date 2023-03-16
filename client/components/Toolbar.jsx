// import statements
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { user, thunks } from '../slice.js';
import { useNavigate } from 'react-router-dom';

// TO DO:
  // add button functionality
  // in order to access and manipulate state, will you need to implement useSelector and/or useDispatch here?

const Toolbar = (props) => {
  // test to see if I can get username from store
  // const username = useSelector(user)


  // test to see if I can get username after logging in
  // on load useDispatch to set username in store, the follow up with use selector
  useEffect(state=>
    {console.log('in use effect')
     username = state.user.username} )

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return(
    <div className = 'toolBar'>
      <div className = 'title'>Welcome {username}</div>
      <div className = 'right align'>
        <button onClick={() => dispatch(thunks.createListThunk())}>Add List</button>
        <button>Delete All Tasks</button>
        <button onClick={() => navigate('/')}>Sign Out</button>
      </div> 
    </div>
  )

}

export default Toolbar
