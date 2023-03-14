import React from 'react';
import Task from './Task.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, deleteList } from '../slice.js';
import { thunks } from '../slice.js';

const List = (props) => {
  // assign the evaluated result of useDispatch to a constant, dispatch
  const dispatch = useDispatch();

  // capture the array of lists from store in a constant called stateLists --> THIS DOESN'T WORK
  const stateLists = useSelector((state) => state.lists)

  // populate an array of tasks with the tasks in the current list's tasks array (from props)
  const arrOfTasks = [];
  console.log('list props: ', props)
  console.log('stateLists in list component: ', stateLists)
  for (let i = 0; i < props.tasks.length; i++) {
    const currentTask = props.tasks[i];
    arrOfTasks.push(
      <Task 
        title={currentTask.title}
        description={currentTask.description}
        assignment={currentTask.assignment}
        currentList={currentTask.currentList}
      />
    )
  }

  // define the addTask functionality that will trigger on button click
  const addTask = () => {
    let listIndex;
    for (let i = 0; i < stateLists.length; i++) {
      if (stateLists[i].id === props.id) listIndex = i;
    }
    dispatch(addTask(listIndex));
  }

  // define the deleteList functionality that will trigger on button click
  const deleteList = () => {
    const updatedList = stateLists.filter(list => list.id !== props.id);
    dispatch(deleteList(updatedList));
  }

  // render the array of tasks and buttons
  return (
    <div className='list'>
      <div>Title:
        <input defaultValue={props.title}></input>
      </div>
      <div>Team:
        <input defaultValue={props.team}></input>
      </div>
      <div>Tasks:
        {arrOfTasks}
      </div>
      <div className='buttonRow'>
        <button onClick={() => dispatch(thunks.addTaskThunk(props._id))}>Add Task</button>
        <button onClick={deleteList}>Delete List</button>
        <button onClick={() => dispatch(thunks.saveListThunk({title: props.title, team: props.team, _id: props._id, tasks: props.tasks}))}>Save List</button>
      </div>
    </div>
  )
}

export default List;