const router = require('express').Router();
const todoController = require('../controller/todo');

router.post('/add', todoController.addTodo);
router.put('/update', todoController.updateTodo);
router.delete('/delete', todoController.deleteTodo);
router.delete('/get-all', todoController.getAllTodos);
router.all('*', (req, res) => {
  res.status(404).json({ error: 'Nothing found!' });
});
module.exports = router;
