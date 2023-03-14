const express = require('express');
const controller = require('../controllers/controller.js');
const router = express.Router();

router.use(express.json());

router.get('/home', controller.home, (req, res) => {
  res.status(200).send(res.locals.lists);
});

router.post('/login', controller.login, (req, res) => {
  res.status(200).send(res.locals.people);
});

router.post('/signup', controller.isUnique, controller.signup, (req, res) => {
  res.status(200).json({ message: 'user created' });
});

router.post('/createList', controller.createList, (req, res) => {
  res.status(200).json(res.locals._id); // tell them to store this id in list component
});

router.post('/deleteList', controller.deleteList, (req, res) => {
  res.status(200).json('list deleted');
});

router.post('/saveList', controller.saveList, (req, res) => {
  res.status(200).json(res.locals.updated);
})

router.post('/createAndAddTask', controller.createAndAddTask, (req, res) => {
  res.status(200).json('task created');
});

router.post('/editTask', controller.editTask, (req, res) => {
  res.status(200).json('task edited');
});

router.post('/deleteTask', controller.deleteTask, (req, res) => {
  res.status(200).json('task deleted');
});

router.post('/moveTask', controller.moveTask, (req, res) => {
  res.status(200).json('task moved');
});

router.post('/assignUser', controller.assignUser, (req, res) => {
  res.status(200).json('user assigned');
});

router.post('/unassignUser', controller.unassignUser, (req, res) => {
  res.status(200).json('user unassigned');
});

module.exports = router;
