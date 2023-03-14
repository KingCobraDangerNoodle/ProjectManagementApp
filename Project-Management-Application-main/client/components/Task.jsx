import React from 'react';
import { useNavigate, Link, useLocation } from "react-router-dom";

// define the task component
const Task = (props) => {

  /// render appropriate divs and their values
  return (
    <div>
      <div>
        <input type='text'
          placeholder='title'
          />
      </div>
      <div>
        <input type='text'
          placeholder='description'
        />
      </div>
      <select>
        <option></option>
        <option></option>
      </select>
      <button>Add Task</button>
      <button>Delete Task</button>
    </div>
  )
}

export default Task;