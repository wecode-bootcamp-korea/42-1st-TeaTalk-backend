const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  emailValidation,
  pwValidation,
  phoneNumValidation,
  accountExistanceCheck,
} = require("../utils/user_validation");

const createUser = async (
  account,
  password,
  email,
  name,
  phoneNum,
  birthdate,
  gender
) => {
  const accountExistanceCheck = async (account) => {
    const [userInfo] = await userDao.getUserByAccount(account);

    if (userInfo) {
      const error = new Error("THIS ID EXISTS ALREADY!!");
      error.statusCode = 400;
      throw error;
    }
  };
  await accountExistanceCheck(account);
  await emailValidation(email);
  await pwValidation(password);
  await phoneNumValidation(phoneNum);
  const saltRounds = 12;
  const hashedPw = await bcrypt.hash(password, saltRounds);
  const createUserResult = await userDao.createUser(
    account,
    hashedPw,
    email,
    name,
    phoneNum,
    birthdate,
    gender
  );
  return createUserResult;
};

const login = async (account, password) => {
  const [userInfo] = await userDao.login(account);
  if (!userInfo) {
    const error = new Error("PLEASE SIGNUP!!");
    error.statusCode = 400;
    throw error;
  }

  const rightPw = await bcrypt.compare(password, userInfo.password.toString());
  if (!rightPw) {
    const error = new Error("WRONG PASSWORD!!!");
    error.statusCode = 400;
    throw error;
  }

  const payLoad = { id: userInfo.id };
  const secretKey = process.env.SECRET_KEY;

  return jwt.sign(payLoad, secretKey);
};

module.exports = {
  createUser,
  login,
  accountExistanceCheck,
};
