const jwt = require("jsonwebtoken");

const loginRequired = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      const error = new Error("YOU NEEDS TOKEN!!");
      error.statusCode = 400;
      throw error;
    }
    const SECRET_KEY = process.env.SECRET_KEY;
    const decode = jwt.verify(token, SECRET_KEY);

    req.user = decode.id;
    return next();
  } catch (err) {
    res.status(err.statusCode).json(err.message);
  }
};

module.exports = {
  loginRequired,
};
