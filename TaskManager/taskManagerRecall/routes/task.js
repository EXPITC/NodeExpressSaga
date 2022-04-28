const express = require('express')
const router = express.Router()
const {
    getTasks,
    getTask,
    newTask,
    editTask,
    deleteTask,
    activeTask,
    activeOrCompletedTaskToday
} = require('../controller/task')

const defaultRoute = '/api/v1'

router.route(defaultRoute+'/tasks').get(getTasks).post(newTask)
router.route(defaultRoute + '/task/:id').get(getTask).patch(editTask).delete(deleteTask)
router.route(defaultRoute +'/tasks/active').get(activeTask)
router.route(defaultRoute +'/tasks/active').get(activeTask)
router.route(defaultRoute +'/tasks/today/:ActiveOrCompleted').get(activeOrCompletedTaskToday)

module.exports = router