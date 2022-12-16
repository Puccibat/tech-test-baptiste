const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
  const { token, user_id } = req.body;

  try {
    const veryfiedToken = jwt.verify(token, process.env.SECRET);
    if (veryfiedToken._id === user_id) {
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(400).send('Invalid Token');
  }
};

module.exports = { verifyUser };
