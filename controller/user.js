const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/user');

module.exports.register = async (req, res) => {
  if (typeof req.body == undefined) {
    return res
      .status(401)
      .json({ status: 'error', message: 'user details not provided' });
  }
  const { name, email, password } = req.body;

  if (name && email && password) {
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res.status(401).json({
        status: 'error',
        message: 'User already exist',
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashPassword,
    });
    await user.save((err, _user) => {
      if (err) {
        return res.status(401).json({
          status: 'error',
          error: err,
          message: 'registration failed',
        });
      }
      const token = jwt.sign(
        { user_id: _user._id, email: _user.email, name: _user.name },
        process.env.TOKEN_SECRET,
        {
          expiresIn: '2h',
        }
      );
      res.status(200).json({
        status: 'success',
        token: token,
        message: 'Registration successfull!',
      });
    });
  } else {
    return res
      .status(401)
      .json({ status: 'error', message: 'all fields are required' });
  }
};

module.exports.login = async (req, res) => {
  if (typeof req.body == undefined) {
    return res
      .status(401)
      .json({ status: 'error', message: 'user details not provided' });
  }
  const { email, password } = req.body;
  if (email && password) {
    const user = await User.findOne({ email: email });
    if (user) {
      const token = jwt.sign(
        { user_id: user._id, email: user.email, name: user.name },
        process.env.TOKEN_SECRET,
        {
          expiresIn: '2h',
        }
      );
      res.status(201).json({
        status: 'success',
        token: token,
        message: 'login successfull!',
      });
    } else {
      return res.status(401).json({
        status: 'error',
        message: 'User not exist',
      });
    }
  } else {
    return res
      .status(401)
      .json({ status: 'error', message: 'all fields are required!' });
  }
};
