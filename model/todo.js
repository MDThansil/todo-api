const mongoose = require('mongoose');
const user = require('./user');

const todoSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: user,
    },
    text: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model('todo', todoSchema);
