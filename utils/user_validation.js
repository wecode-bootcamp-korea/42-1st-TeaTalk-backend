const userDao = require("../models/userDao");

const accountExistanceCheck = async (account) => {
  const [accountExistanceCheck] = await userDao.login(account);

  if (accountExistanceCheck) {
    const error = new Error("THIS ID EXISTS ALREADY!!");
    error.statusCode = 400;
    throw error;
  }
};

const emailValidation = async (email) => {
  if (!email.includes("@")) {
    const error = new Error("PLEASE ADD @ IN YOUR EMAIL!!");
    error.statusCode = 400;
    throw error;
  }
};

const pwValidation = async (password) => {
  const pwVal = new RegExp(
    "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );
  if (!pwVal.test(password)) {
    const error = new Error(
      "PLEASE INCLUDES ALPHABET, NUMBER AND SPECIAL SYMBOLS WITH 8 DIGITS OR MORE"
    );

    error.statusCode = 400;
    throw error;
  }
};

const phoneNumValidation = async (phoneNum) => {
  if (!(phoneNum.length === 11)) {
    const error = new Error("PLEASE CHECK YOUR PHONE NUMBER DIGITS!!");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  emailValidation,
  pwValidation,
  phoneNumValidation,
  accountExistanceCheck,
};
