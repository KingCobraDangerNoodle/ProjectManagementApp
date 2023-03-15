const express = require('express');
const listController = require('../controllers/listController.js');
const logInController = require('../controllers/logInController.js');
const taskController = require('../controllers/taskController.js');
const userController = require('../controllers/userController.js');

const router = express.Router();

router.use(express.json());

router.get('/home', listController.home, (req, res) => {
  res.status(200).send(res.locals.lists);
});

router.post('/login', logInController.login, (req, res) => {
  console.log('in login route');
  res.status(200).send(res.locals.people);
});

router.post(
  '/signup',
  logInController.isUnique,
  logInController.signup,
  (req, res) => {
    res.status(200).json({ message: 'user created' });
  }
);

router.post('/createList', listController.createList, (req, res) => {
  res.status(200).json(res.locals._id); // tell them to store this id in list component
});

router.post('/deleteList', listController.deleteList, (req, res) => {
  res.status(200).json('list deleted');
});

router.post('/saveList', listController.saveList, (req, res) => {
  res.status(200).json(res.locals.updated);
});

router.post(
  '/createAndAddTask',
  taskController.createAndAddTask,
  (req, res) => {
    res.status(200).json('task created');
  }
);

router.post('/editTask', taskController.editTask, (req, res) => {
  res.status(200).json('task edited');
});

router.post('/deleteTask', taskController.deleteTask, (req, res) => {
  res.status(200).json('task deleted');
});

router.post('/moveTask', taskController.moveTask, (req, res) => {
  res.status(200).json('task moved');
});

// this should be under userController ideally
router.post('/assignUser', listController.assignUser, (req, res) => {
  res.status(200).json('user assigned');
});

router.post('/unassignUser', listController.unassignUser, (req, res) => {
  res.status(200).json('user unassigned');
});

module.exports = router;
