import React from 'react';
import { useNavigate, Link, useLocation } from "react-router-dom";


// define the task component
const Task = (props) => {

  // useEffect(() =>{

  // })

  /// render appropriate divs and their values
  return (
    <div>
        <input type='text'
          placeholder='description'
        />

      <button onClick={()=>props.deleteTaskHandler(props.description)}>Delete Task</button>
    </div>
  )
}

export default Task;
