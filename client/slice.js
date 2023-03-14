import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux'

export const initialState = { lists: [] };
export const findInitialState = createAsyncThunk('lists/fetchLists', async () => {

  // const fetchedState = await axios.get('/home');
  // .then(results => results)
  // .catch(err => console.log(err));

  return fetchedState;
})

const blankList = {
  title: '',
  tasks: [],
  team: '',
  _id: undefined,
}

const blankTask = {
  title: '',
  description: '',
  assignment: '',
  currentList: '',
}

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    // action payload: newListId, fetched in the corresponding thunk
    createList(state, action) {
      console.log('in createList action');
      state.lists.push({ ...blankList, _id: action.payload });
    },
    // action payload: list object 
    saveList(state, action) {
      let listIndex;
      for (let i = 0; i < state.lists.length; i++) {
        if (state.lists[i]._id === action.payload._id) listIndex = i;
      }
      state.lists.splice(listIndex, 1); //What does this do - Giles
      state.lists.push(action.payload); //Why?
    },
    // action payload: updated lists array 
    deleteList(state, action) {

      state.lists = action.payload;
    },
    // action payload: 
    addTask(state, action) {
      console.log('addTask action payload: ', action.payload)
      let index;
      for (let i = 0; i < state.lists.length; i++) {
        if (state.lists[i]._id === action.payload) index = i;
      }
      state.lists[index].tasks.push(blankTask);
    },
    // payload should be an object with two properties, listIndex and taskIndex
    // listIndex should be the index of the current list, and taskIndex should be the
    // index of the current task on the tasks array
    deleteTask(state, action) {
      state.lists[action.payload.listIndex].tasks.splice(action.payload.taskIndex, 1);
    },
    // payload should be an object with three properties, listIndex, taskIndex, and taskDetails.
    // listIndex is the index of the current list; taskIndex is the index of the current task on the 
    // tasks array; taskDetails is an object with all of the task's details
    saveTask(state, action) {
      state.lists[action.payload.listIndex].tasks[action.payload.taskIndex] = action.payload.taskDetails;
    },
    // payload should be an object with four properties: currentListIndex, taskIndex, newListIndex, and taskDetails
    moveTask(state, action) {
      state.lists[action.payload.currentListIndex].tasks.splice(action.payload.taskIndex, 1);
      state.lists[action.payload.newListIndex].tasks.push(action.payload.taskDetails);
    }
  },
  extraReducers: builder => {
    builder
      .addCase(findInitialState.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(findInitialState.fulfilled, (state, action) => {
        state.lists = action.payload;
      })
  }
})

export const thunks = {

  createListThunk() {
    console.log('in createListThunk')
    return (dispatch) => {
      axios.post('/createList')
        .then(response => dispatch(createList(response.data)))
    }
  },

  saveListThunk(listDetails) {
    return (dispatch) => {
      axios.post('/saveList', { listDetails })
        .then(response => dispatch(saveList(response)))
    }
  },

  // deleteListThunk(listDetails) {
  //   return  (dispatch) => {
  //     const { listIndex, listId } = listDetails;
  //     dispatch(deleteList(listIndex));
  //     axios.post('/deleteList',{_id:action.payload._id, list:payload.list})
  //   }
  // },

  //edit action payload here
  addTaskThunk(listId) {
    return (dispatch) => {
      console.log('in addTaskThunk');
      dispatch(addTask(listId));
      axios.post('/createAndAddTask', { _id: listId, task: '' })
        .then(response => {
          if (response.status !== 200) return 'Error in addTaskThunk'
        });

    }
  },
  // // **edit considering the necessary inputs and outputs for server requests
  // deleteTaskThunk(listIndexAndId,){
  //   return async (state, action) => {
  //     const { listIndex, listId } = listIndexAndId;
  //     dipatch(deleteTask(listId));
  //     axios.post('/deleteTask', { _id: action.payload._id, task: action.payload.task })
  //   }
  // },
  // //edit later
  // saveTaskThunk(listIndexAndId) { 
  //   return async (state,action) => {
  //     const { listIndex, listId } = listIndexAndId;
  //     dipatch(saveTask(listId));
  //     axios.post('/saveTask', { _id: listId, task: action.payload })

  //   }
  // },
  // //edit later
  // moveTaskThunk() { 
  //   return async (state, action) => {
  //     const { listIndex, listId } = listIndexAndId;
  //     dipatch(deleteTask(listId));
  //     axios.post('/moveTask', { idOriginal: action.payload.idOriginal, idNew: action.payload.idNew, task: action.payload.task})
  //   }
  // },

  // extraReducersThunk() { 
  //   return async (state, action) => {
  //     const { listIndex, listId } = listIndexAndId;
  //     dipatch(deleteTask(listId));
  //     axios.post('/editTask', { _id: listId, task: action.payload })
  //   }
  // },

}

export const { createList, deleteList, addTask, deleteTask, saveTask, moveTask, saveList } = listsSlice.actions;
export default listsSlice;