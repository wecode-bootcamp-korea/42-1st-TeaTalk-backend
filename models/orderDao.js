const { teaDataSource } = require("./datasource");
const getOrderPageForCartItems = async (userId) => {
  try {
    return await teaDataSource.query(
      `SELECT
      c.id as cartId,
      u.id as userId,
      p.id as productId,
      p.name as productName,
      p.image_url as productImg,
      c.quantity,
      (p.price * c.quantity) as totalProductPriceWithQuantity
    FROM carts c
    INNER JOIN users u
    ON c.user_id = u.id
    INNER JOIN products p
    ON p.id = c.product_id
    WHERE u.id = ? `,
      [userId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("INVALID DATA!!!");
    error.statusCode = 500;
    res.status(error.statusCode).json(error.message);
  }
};

const addressInfo = async (userId) => {
  return teaDataSource.query(
    `SELECT
      d.receiver_name,
      d.receiver_phone_number,
      d.receiver_zipcode,
      d.receiver_address,
      u.id as userId
    FROM users u
    INNER JOIN deliveries d
    ON d.user_id = u.id
    WHERE u.id = ? `,
    [userId]
  );
};

const ordererInfo = async (userId) => {
  return teaDataSource.query(
    `SELECT
      name,
      email,
      phone_number,
      point
  FROM users 
  WHERE id = ?`,
    [userId]
  );
};

const orderResult = async (
  userId,
  cart,
  totalPrice,
  deliveryPrice,
  receiverName,
  receiverPhoneNum,
  receiverZipcode,
  receiverAddress,
  deliveryMessage
) => {
  const queryRunner = teaDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const addressId = await queryRunner.query(
      `INSERT INTO deliveries
        (user_id,
        receiver_name,
        receiver_phone_number,
        receiver_zipcode, 
        receiver_address, 
        delivery_message
        )
      VALUES (?,?,?,?,?,?)`,
      [
        userId,
        receiverName,
        receiverPhoneNum,
        receiverZipcode,
        receiverAddress,
        deliveryMessage,
      ]
    );

    const deliveryId = addressId.insertId;

    const orders = await queryRunner.query(
      `INSERT INTO orders
        (user_id, 
        price_amount, 
        delivery_price, 
        delivery_id
        )
      VALUES (?,?,?,?)`,
      [userId, totalPrice, deliveryPrice, deliveryId]
    );

    const orderId = orders.inserId;

    await cart.forEach((c) => {
      const query = `INSERT INTO order_items
        (order_id, 
        product_id, 
        quantity, 
        total_price, 
        cart_id
        )
      VALUES (?,?,?,?,?)`;

      queryRunner.query(query, [
        orderId,
        c.productId,
        c.quantity,
        c.totalProductPriceWithQuantity,
        c.cartId,
      ]);
    });

    await queryRunner.query(
      `DELETE FROM
        carts
      WHERE
        id = ?;
      `,
      [userId]
    );

    await queryRunner.query(
      `UPDATE
          users
        SET
          point = point - ?
        WHERE
          id = ?
        `,
      [totalPrice, userId]
    );

    await queryRunner.commitTransaction();

    const result = await teaDataSource.query(
      `SELECT
      u.name,
      u.email,
      u.phone_number,
      u.point,
      d.receiver_name,
      d.receiver_phone_number,
      d.receiver_zipcode,
      d.receiver_address,
      or.id as orderNumber,
      or.price_amount as finalTotalPrice,
      or.delivery_price,
      p.name,
      p.image_url,
      oi.quantity,
      oi.total_price
    FROM orders or
    INNER JOIN users u
    ON u.id = or.user_id
    INNER JOIN deliveries d
    ON u.id = d.user_id
    INNER JOIN order_items oi
    ON or.id = oi.order_id
    INNER JOIN products p
    ON p.id = oi.product_id
    WHERE or.user_id = ?
    )`,
      [orderId]
    );

    return result;
  } catch (err) {
    console.log(err);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};

module.exports = {
  getOrderPageForCartItems,
  addressInfo,
  ordererInfo,
  orderResult,
};
