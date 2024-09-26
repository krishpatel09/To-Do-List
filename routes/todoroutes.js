const express = require('express')
const router = express.Router();
const todocontroller = require('../controller/todocontroller')

router.get('/todos' , todocontroller.getTodos);
router.post('/todos' ,todocontroller.addTodo);
router.put('/todos/:id',todocontroller.updateTodo);
router.delete('/todos/:id',todocontroller.deleteTodo);

module.exports = router;
