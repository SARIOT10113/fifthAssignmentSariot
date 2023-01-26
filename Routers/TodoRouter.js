const express = require('express');
const router = express.Router();
const TodoController = require('../Controllers/TodoController');
const Authentication = require('../Middleware/Authentication');


router.post('/createTodo',Authentication,TodoController.createTodo)
router.get('/getTodos',Authentication,TodoController.getTodos)
router.post('/getTodoById/:id',Authentication,TodoController.getTodoById)
router.put('/updateTodo/:id',Authentication,TodoController.updateTodo)
router.patch('/updateTodoStatus/:id',Authentication,TodoController.updateTodoStatus)
router.delete('/deleteTodo/:id',Authentication,TodoController.deleteTodo)

// FILETER SECTION
router.post('/statusFilterByTodo/:todoStatus',Authentication,TodoController.statusFilterByTodo);

module.exports = router ;
