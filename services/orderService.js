const orderDao = require("../models/orderDao");
const userDao = require("../models/userDao");

const getOrders = async (userId, deliveryPrice) => {
  const cartItems = await orderDao.getOrders(userId);
  const userInfo = await ordererInfo(userId);
  const basicAddress = await userBasicAddress(userId);

  const finalCart = { cartItems: cartItems };
  finalCart.deliveryPrice = deliveryPrice;
  finalCart.ordererInfo = userInfo;

  if (basicAddress) {
    finalCart.userBasicAddress = basicAddress;
  }

  return finalCart;
};

const getDirectOrder = async (userId, productId, quantity, deliveryPrice) => {
  const orderItem = await orderDao.getDirectOrder(userId, productId, quantity);
  const userInfo = await ordererInfo(userId);
  const basicAddress = await userBasicAddress(userId);

  const getOrderItem = { orderItem: orderItem };
  getOrderItem.deliveryPrice = deliveryPrice;
  getOrderItem.ordererInfo = userInfo;

  if (basicAddress) {
    getOrderItem.userBasicAddress = basicAddress;
  }

  return getOrderItem;
};

const userBasicAddress = async (userId) => {
  const [info] = await orderDao.getAddressByUserId(userId);
  return info;
};

const ordererInfo = async (userId) => {
  const [ordererInfo] = await userDao.getUserByAccount(userId);
  return ordererInfo;
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
  return await orderDao.createOrders(
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
};

module.exports = {
  getOrders,
  getDirectOrder,
  createOrders,
};
