const jwt = require('jsonwebtoken');

module.exports.isAuthenticated = (req, res, next) => {
  const authToken =
    req.body.token || req.query.token || req.headers['x-access-token'];
  if (!authToken) {
    return res.status(401).json({ error: 'Auth token not provided' });
  }
  jwt.verify(authToken, process.env.TOKEN_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid auth token!' });
    }
    req.owner = {
      user_id: payload.user_id,
      name: payload.name,
      email: payload.email,
    };
    next();
  });
};
