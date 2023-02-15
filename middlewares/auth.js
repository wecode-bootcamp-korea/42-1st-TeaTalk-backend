const jwt = require("jsonwebtoken");

const loginRequired = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      const error = new Error("YOU NEEDS TOKEN!!");
      error.statusCode = 400;
      throw error;
    }
    const decode = jwt.verify(
      token,
      process.env.SECRET_KEY,
      function (err, decoded) {
        if (!decoded) {
          const error = new Error("YOUR TOKEN IS INVALID!!");
          error.statusCode = 401;
          throw error;
        }
        return decoded;
      }
    );

    req.user = decode.id;
    next();
  } catch (err) {
    res.status(err.statusCode).json(err.message);
  }
};

module.exports = {
  loginRequired,
};
