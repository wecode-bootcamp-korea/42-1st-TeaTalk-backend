const orderService = require("../services/orderService");
const getOrders = async (req, res) => {
  try {
    const userId = req.user;

    const orders = await orderService.getOrders(userId);

    return res.status(200).json(orders);
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
};

const getDirectOrder = async (req, res) => {
  try {
    const userId = req.user;
    const { productId } = req.params;
    const { quantity, deliveryPrice } = req.body;

    const directOrder = await orderService.getDirectOrder(
      userId,
      productId,
      quantity,
      deliveryPrice
    );
    return res.status(200).json(directOrder);
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
};

const createOrders = async (req, res) => {
  try {
    const userId = req.user;
    const {
      cart,
      totalPrice,
      deliveryPrice,
      receiverName,
      receiverPhoneNum,
      receiverZipcode,
      receiverAddress,
      deliveryMessage,
    } = req.body;

    if (
      !totalPrice ||
      !deliveryPrice ||
      !receiverName ||
      !receiverPhoneNum ||
      !receiverZipcode ||
      !receiverAddress
    ) {
      const error = new Error("keyError!!");
      error.statusCode = 400;
      throw error;
    }

    const result = await orderService.createOrders(
      userId,
      cart,
      totalPrice,
      deliveryPrice,
      receiverName,
      receiverPhoneNum,
      receiverZipcode,
      receiverAddress,
      deliveryMessage
    );

    return res.status(200).json({ data: result });
  } catch (err) {
    return res.status(err.statusCode || 500).json(err.message);
  }
};

module.exports = {
  getOrders,
  getDirectOrder,
  createOrders,
};
