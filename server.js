require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 8001;

//routes
const userRoute = require('./routes/user.js');
const todoRoute = require('./routes/todo.js');
const { isAuthenticated } = require('./middleware/todo.js');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

app.use('/api/v1/user', userRoute);
app.use('/api/v1/todo', isAuthenticated, todoRoute);

mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(process.env.PORT || port, () => {
      console.log('connected');
    });
  })
  .catch((error) => {
    console.log(error);
  });
