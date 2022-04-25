const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks');

router.route('/tasks').get(getAllTasks).post(createTask);
router.route('/task/:id').get(getTask).patch(updateTask).delete(deleteTask);
// don't do like this not clean 
// router.route('/create').(createTask);
// router.route('/updateTask/:id').get(updateTask);
// router.route('/delete/:id').get(deleteTask);

module.exports = router;
