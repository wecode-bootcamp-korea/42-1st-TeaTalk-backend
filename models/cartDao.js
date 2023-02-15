const { teaDataSource } = require("./datasource.js");

const addProductToCart = async (userId, productId, quantity) => {
  return await teaDataSource.query(
    `INSERT INTO 
      carts (
      user_id,
      product_id,
      quantity
      )
      VALUE (
        ?,
        ?,
        ?
      ) ON DUPLICATE KEY UPDATE quantity = quantity + ?;`,
    [userId, productId, quantity, quantity]
  );
};

const getCartsByUserId = async (userId) => {
  return await teaDataSource.query(
    `SELECT
        p.name AS product_id,
        c.quantity AS quantity,
        p.price AS product_price,
        p.image_url AS product_main_image
      FROM carts c
      INNER JOIN users u ON c.user_id = u.id
      INNER JOIN products p ON c.product_id = p.id
      WHERE u.id = ?;`,
    [userId]
  );
};

const deleteCartById = async (userId, cartId) => {
  return await teaDataSource.query(
    `DELETE FROM
      carts c
      WHERE
      c.user_id = ?
      AND c.id IN (?);`,
    [userId, cartId]
  );
};

module.exports = {
  addProductToCart,
  getCartsByUserId,
  deleteCartById,
};
