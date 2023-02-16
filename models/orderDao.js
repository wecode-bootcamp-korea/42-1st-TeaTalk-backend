const { teaDataSource } = require("./datasource");

const getOrders = async (userId) => {
  try {
    return await teaDataSource.query(
      `
      SELECT
        c.id as cartId,
        u.id as userId,
        p.id as productId,
        p.name as productName,
        p.image_url as productImg,
        c.quantity,
        (p.price * c.quantity) as totalProductPriceWithQuantity
      FROM carts c
      INNER JOIN users u ON c.user_id = u.id
      INNER JOIN products p ON p.id = c.product_id
      WHERE u.id = ?`,
      [userId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("INVALID DATA!!!");
    error.statusCode = 500;
    res.status(error.statusCode).json(error.message);
  }
};

const getDirectOrder = async (userId, productId, quantity) => {
  try {
    const quantityToNumber = Number(quantity);
    return await teaDataSource.query(
      `
      SELECT
        p.id as productId,
        p.name as productName,
        p.image_url as productImg,
        (p.price * ?) as totalProductPriceWithQuantity
      FROM products p
      WHERE p.id = ?`,
      [quantityToNumber, productId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("INVALID DATA!!!");
    error.statusCode = 500;
    res.status(error.statusCode).json(error.message);
  }
};

const getAddressByUserId = async (userId) => {
  return teaDataSource.query(
    `
    SELECT
      d.id,
      d.receiver_name as receiverName,
      d.receiver_phone_number as receiverPhoneNum,
      d.receiver_zipcode as receiverZipcode,
      d.receiver_address as receiverAddress
    FROM deliveries d
    WHERE d.user_id = ?`,
    [userId]
  );
};

const createOrders = async (
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
      `
      INSERT INTO deliveries
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
      `
      INSERT INTO orders
        (user_id, 
        price_amount, 
        delivery_price, 
        delivery_id
        )
      VALUES (?,?,?,?)`,
      [userId, totalPrice, deliveryPrice, deliveryId]
    );

    const orderId = orders.insertId;
    console.log(cart);
    let values = [];
    cart.forEach((c) => {
      values.push([
        orderId,
        c.productId,
        c.quantity,
        c.totalProductPriceWithQuantity,
        c.cartId,
      ]);
    });

    const query = `
      INSERT INTO order_items
        (order_id, 
        product_id, 
        quantity, 
        total_price, 
        cart_id
        )
      VALUES ?`;

    queryRunner.query(query, [values]);

    await cart.forEach((c) => {
      const deleteCartQuery = `
        DELETE FROM
          carts
        WHERE
          id = ?`;

      queryRunner.query(deleteCartQuery, [c.cartId]);
    });

    await queryRunner.query(
      `
      UPDATE
        users
      SET
        point = point - ?
      WHERE id = ?`,
      [totalPrice, userId]
    );

    const [orderResult] = await queryRunner.query(
      `
      SELECT
        o.id,
        o.price_amount as finalTotalPrice,
        o.delivery_Price as deliveryPrice,
        u.name as userName,
        u.email as userEmail,
        u.phone_number as userPhoneNum,
        u.point,
        d.receiver_name as receiverName,
        d.receiver_phone_number as receiverPhoneNum,
        d.receiver_zipcode as receiverZipcode,
        d.receiver_address as receiverAddress
      FROM orders o
      INNER JOIN deliveries d ON o.delivery_id = d.id
      INNER JOIN users u ON o.user_id = u.id
      INNER JOIN (
        SELECT
          order_id,
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'productQuantity', order_items.quantity,
              'productPriceWithQuantity', order_items.total_price)
          ) as oiList
        FROM order_items GROUP BY order_id
      ) oi
      ON oi.order_id = o.id
      WHERE o.id = ?`,
      [orderId]
    );

    const products = await queryRunner.query(
      `
      SELECT
        p.id,
        p.name,
        p.image_url as imgUrl,
        oi.quantity,
        oi.total_price as totalPrice
      FROM order_items oi
      INNER JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?`,
      [orderId]
    );

    orderResult.products = products;

    await queryRunner.commitTransaction();
    return orderResult;
  } catch (err) {
    console.log(err);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};

module.exports = {
  getOrders,
  getAddressByUserId,
  getDirectOrder,
  createOrders,
};
