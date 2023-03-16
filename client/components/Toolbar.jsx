// import statements
import React from 'react';
import { useDispatch } from 'react-redux';
import { thunks } from '../slice.js';
import { useNavigate } from 'react-router-dom';

// TO DO:
  // add button functionality
  // in order to access and manipulate state, will you need to implement useSelector and/or useDispatch here?

const Toolbar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return(
    <div className = 'toolBar'>
      <div className = 'title'>{props.username}</div>
      <div className = 'right align'>
        <button onClick={() => dispatch(thunks.createListThunk())}>Add List</button>
        <button>Save Project</button>
        <button onClick={() => navigate('/')}>Sign Out</button>
      </div>
    </div>
  )

}

export default Toolbar