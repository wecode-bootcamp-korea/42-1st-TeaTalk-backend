const userService = require("../services/userService");

const createUser = async (req, res) => {
  try {
    const { account, password, email, name, phoneNum, birthdate, gender } =
      req.body;
    if (
      !account ||
      !password ||
      !email ||
      !name ||
      !phoneNum ||
      !birthdate ||
      !gender
    ) {
      const error = Error("PLEASE FILL IN ALL INFORMATION BLANKS!!");
      error.statusCode = 400;
      throw error;
    }

    await userService.createUser(
      account,
      password,
      email,
      name,
      phoneNum,
      birthdate,
      gender
    );
    return res.status(200).json({ message: "createUser" });
  } catch (err) {
    return res.status(err.statusCode).json(err.message);
  }
};

const login = async (req, res) => {
  try {
    const { account, password } = req.body;

    if (!account || !password) {
      const error = Error("PLEASE FILL IN ID AND PASSWORD!!!");
      error.statusCode = 400;
      throw error;
    }
    const token = await userService.login(account, password);
    return res.status(200).json({ accessToken: token });
  } catch (err) {
    return res.status(err.statusCode).json(err.message);
  }
};

module.exports = {
  createUser,
  login,
};
