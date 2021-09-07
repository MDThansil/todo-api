const mongoose = require('mongoose');
const Todo = require('../model/todo');

module.exports.addTodo = async (req, res) => {
  if (typeof req.body == undefined) {
    return res.json({ status: 'error', message: 'Input not provided!' });
  }
  const owner = req.owner;

  if (!req.body.text) {
    return res.json({ status: 'error', message: 'please provide todo text' });
  }

  const todo = new Todo({
    owner: owner.user_id,
    text: req.body.text,
  });

  todo.save((error, _todo) => {
    if (error) {
      return res
        .status(402)
        .json({ status: 'error', message: 'someting went wrong!' });
    }
    res
      .status(200)
      .json({ status: 'success', message: 'todo added successfully' });
  });
};

module.exports.updateTodo = (req, res) => {
  if (typeof req.body == undefined) {
    return res.json({ status: 'error', message: 'Input not provided!' });
  }

  const { id, text } = req.body;

  if (!(text && id)) {
    return res.json({ status: 'error', message: 'Data not provided' });
  }

  Todo.findByIdAndUpdate(id, { text: text }, (error, data) => {
    if (error) {
      return res
        .status(402)
        .json({ status: 'error', message: 'something went wrong!' });
    }
    return res
      .status(200)
      .json({ status: 'success', message: 'Todo updation successfull' });
  });
};

module.exports.deleteTodo = (req, res) => {
  if (typeof req.body == undefined) {
    return res.json({ status: 'error', message: 'Input not provided!' });
  }

  const { id } = req.body;

  if (!id) {
    return res.json({ status: 'error', message: 'Id not provided' });
  }

  Todo.findByIdAndDelete(id, (error, data) => {
    if (error) {
      return res
        .status(402)
        .json({ status: 'error', message: 'something went wrong!' });
    }
    return res
      .status(200)
      .json({ status: 'success', message: 'Todo item deleted' });
  });
};

module.exports.getAllTodos = (req, res, next) => {
  const owner = req.owner;
  Todo.find({ owner: owner.user_id }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
  res.end();
};
