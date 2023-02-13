const { teaDataSource } = require("./datasource.js");

const cartIn = async (userId, productId, quantity) => {
  return await teaDataSource.query(
    `INSERT INTO 
      carts (
      user_id,
      product_id,
      quantity)
      VALUE (
        ?,
        ?,
        ?
      ) ON DUPLICATE KEY UPDATE
      quantity = quantity + ?;`,
    [userId, productId, quantity, quantity]
  );
};

const showCart = async (userId) => {
  return await teaDataSource.query(
    `SELECT
      p.name,
      c.quantity,
      p.discount_price,
      p.image_url
      FROM carts c
      INNER JOIN users u
      ON c.user_id = u.id
      INNER JOIN products p
      ON c.product_id = p.id
      WHERE u.id = ?;`,
    [userId]
  );
};

const deleteCart = async (userId, cartIdArr) => {
  console.log(cartIdArr);
  let cartId = "";
  for (let i = 0; i < cartIdArr.length; i++) {
    cartId = cartId + ` OR c.id = ${cartIdArr[i]}`;
  }
  console.log(cartId);
  return await teaDataSource.query(
    `DELETE FROM
      carts c
      WHERE
      c.user_id = ?
      AND (c.id = 0 ${cartId});`,
    [userId]
  );
};

module.exports = {
  cartIn,
  showCart,
  deleteCart,
};
