// routes/task.js
const express = require('express');
const { getTasks, addTask, updateTask, deleteTask } = require('../controllers/taskController'); 
const authMiddleware = require('../middleware/auth'); 
const router = express.Router();

// get task
router.get('/', authMiddleware, getTasks);

// add task
router.post('/', authMiddleware, addTask);

// update task
router.put('/:id', authMiddleware, updateTask);

// delete task
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
