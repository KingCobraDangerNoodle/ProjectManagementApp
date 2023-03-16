import React from 'react';
import Task from './Task.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, deleteList } from '../slice.js';
import { thunks } from '../slice.js';
import { useState } from 'react';

const List = (props) => {
  // assign the evaluated result of useDispatch to a constant, dispatch
  const dispatch = useDispatch();

  const[tasks,setTasks]= useState([])
  const [input,setInput] = useState("");

  function deleteTaskHandler(task){
    const newTaskArr = tasks.slice(0); //make copy of task arr
    newTaskArr.forEach((el,index)=>{
      if(el === task) newTaskArr.splice(index,1); //cut out task
      setTasks(newTaskArr);
    })
  }
  // capture the array of lists from store in a constant called stateLists --> THIS DOESN'T WORK
  const stateLists = useSelector((state) => state.lists)
  // populate an array of tasks with the tasks in the current list's tasks array (from props)
  // const arrOfTasks = [];
  // console.log('list props: ', props)
  // console.log('stateLists in list component: ', stateLists)
  // for (let i = 0; i < props.tasks.length; i++) {
  //   const currentTask = props.tasks[i];
  //   arrOfTasks.push(
  //     <Task
  //       description={currentTask.description}
  //       deleteTaskHandler = {deleteTaskHandler}
  //     />
  //   )
  // }

  // define the addTask functionality that will trigger on button click
  const addTask = () => {
    let listIndex;
    for (let i = 0; i < stateLists.length; i++) {
      if (stateLists[i].id === props.id) listIndex = i;
    }
    dispatch(addTask(listIndex));
  }
  // define the deleteList functionality that will trigger on button click
  const deleteLists = () => {
    const updatedList = stateLists.filter(list => list.id !== props.id);
    dispatch(deleteList(updatedList));
  }

  const

  const addTaskInput(e,input) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      setTasks([...tasks,input])
    }
  }

  // render the array of tasks and buttons
  return (
    <div className='list'>
      <div>
        <label htmlFor='title'>Title:</label>
        <input name='title' type='text' placeholder='Add Title' defaultValue={props.title}></input>
      </div>
        <label htmlFor='task'>Add Task</label>
        <input name='task' type='text' placeholder='Add Task' value onKeyUp={ }></input>
      <></>
      <div>Tasks:
      {tasks.map((task)=><Task description={task} deleteTaskHandler = {deleteTaskHandler}/>)}
      </div>
      <div className='buttonRow'>
        <button onClick={deleteLists}>Delete List</button>
        {/* <button onClick={() => dispatch(thunks.saveListThunk({title: props.title, team: props.team, _id: props._id, tasks: props.tasks}))}>Save List</button> */}
      </div>
    </div>
  )
}

export default List;
