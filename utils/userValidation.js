const emailValidation = async (email) => {
  const emailVal = new RegExp("^[a-z0-9]+@[a-zA-Z]+.[a-zA-Z]{2,3}$");
  if (!emailVal.test(email)) {
    const error = new Error("PLEASE CHECK YOUR EMAIL!!");
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
};
