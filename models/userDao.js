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
        gender
        )
      VALUE(?,?,?,?,?,?,?)
      `,
      [account, hashedPw, email, name, phoneNum, birthdate, gender]
    );
    return result;
  } catch (err) {
    const error = new Error("INVALID DATA INPUT!!");
    error.statusCode = 500;
    throw error;
  }
};

const getUserSimpleInfoByAccount = async (account) => {
  try {
    //return 없어서 계속 error났었음...
    return await teaDataSource.query(
      `SELECT
        id,
        identification,
        password,
        email,
        name,
        phone_number
      FROM users
      WHERE identification = ?`,
      [account]
    );
  } catch (err) {
    const error = new Error("INVALID USER!!");
    error.statusCode = 500;
    throw error;
  }
};

//주소지를 포함한 유저의 모든 정보
const getUserByAccount = async (userId) => {
  try {
    return await teaDataSource.query(
      `SELECT
        users.id,
        users.name,
        users.email,
        users.phone_number,
        address.list as addressList
      FROM users
        INNER JOIN (
          SELECT
            user_id,
            JSON_ARRAYAGG(
              JSON_OBJECT(
                'delivery_id', deliveries.id,
                'receiver_name', deliveries.receiver_name,
                'receiver_phone_nmuber', deliveries.receiver_phone_number,
                'receiver_zipcode', deliveries.receiver_zipcode,
                'receiver_address', deliveries.receiver_address)
              ) as list
            FROM deliveries GROUP BY user_id) address
          ON users.id = address.user_id
          WHERE users.id = ?`,
      [userId]
    );
  } catch (err) {
    const error = new Error("INVALID USER!!");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createUser,
  getUserSimpleInfoByAccount,
  getUserByAccount,
};
