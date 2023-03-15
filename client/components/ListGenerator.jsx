import React from 'react';
import List from './List.jsx';
import { useSelector } from 'react-redux';

const ListGenerator = (props) => {

  // declare a constant lists assign it to state.reducer.lists using useSelector
  const lists = useSelector((state) => {
    return state.lists;
  })
  // declare a constant arrOfLists and populate it with the lists in state.reducer.lists
  const arrOfLists = [];
  for (let i = 0; i < lists.length; i++) {
    const currentList = lists[i];
    arrOfLists.push(
    <List
      title={currentList.title}
      tasks={currentList.tasks}// if we change this to just allTasks {} then only render those task who property is a parent
      team={currentList.team}
      _id={currentList._id}
    />
    );
  }

  // render the array of lists
  return (
    <div className='listContainer'>
      {arrOfLists}
    </div>
  )
}

export default ListGenerator;
