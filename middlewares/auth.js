const jwt = require("jsonwebtoken");

const loginRequired = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
<<<<<<< HEAD

    // token이 없을 때,
=======
>>>>>>> main
    if (!token) {
      const error = new Error("YOU NEEDS TOKEN!!");
      error.statusCode = 400;
      throw error;
    }
<<<<<<< HEAD

    // invalid한 token일 때,
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
=======
    const SECRET_KEY = process.env.SECRET_KEY;
    const decode = jwt.verify(token, SECRET_KEY);

    req.user = decode.id;
    return next();
>>>>>>> main
  } catch (err) {
    res.status(err.statusCode).json(err.message);
  }
};

module.exports = {
  loginRequired,
};
