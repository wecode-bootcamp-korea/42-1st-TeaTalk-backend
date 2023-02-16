const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  emailValidation,
  pwValidation,
  phoneNumValidation,
} = require("../utils/userValidation");

const createUser = async (
  account,
  password,
  email,
  name,
  phoneNum,
  birthdate,
  gender
) => {
  const [userInfo] = await userDao.getUserSimpleInfoByAccount(account);
  if (userInfo) {
    const error = new Error("THIS ID EXISTS ALREADY!!");
    error.statusCode = 400;
    throw error;
  }

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
<<<<<<< HEAD
  const [userInfo] = await userDao.getUserSimpleInfoByAccount(account);
=======
  const [userInfo] = await userDao.getUserByAccount(account);
>>>>>>> main
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
};
