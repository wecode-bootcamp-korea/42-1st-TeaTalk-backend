const { teaDataSource } = require("./datasource");

const createUser = async (
  account,
  hashedPw,
  email,
  name,
  phoneNum,
  birthdate,
  gender
) => {
  try {
    const result = await teaDataSource.query(
      `INSERT INTO users (
        identification,
        password,
        email,
        name,
        phone_number,
        birthdate,
        gender)
      VALUE(?,?,?,?,?,?,?)
      `,
      [account, hashedPw, email, name, phoneNum, birthdate, gender]
    );
    console.log(result);
    return result;
  } catch (err) {
    const error = new Error("INVALID DATA INPUT!!");
    error.statusCode = 500;
    throw error;
  }
};

const login = async (account) => {
  try {
    return await teaDataSource.query(
      `SELECT 
      id,
      identification,
      password
    FROM users
    WHERE identification = ?
    `,
      [account]
    );
  } catch (err) {
    const error = new Error("INVALID USER!!");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createUser,
  login,
};
