const orderDao = require("../models/orderDao");
const userDao = require("../models/userDao");

const getOrders = async (userId) => {
  const cartItems = await orderDao.getOrders(userId);
  const deliveryFee = await calculationForDeliveryPrice(cartItems);
  const userInfo = await ordererInfo(userId);
  const basicAddress = await userBasicAddress(userId);

  const finalCart = { cartItems: cartItems };
  finalCart.deliveryPrice = deliveryFee;
  finalCart.ordererInfo = userInfo;

  if (basicAddress) {
    finalCart.userBasicAddress = basicAddress;
  }

  return finalCart;
};

const getDirectOrder = async (userId, productId, quantity, deliveryPrice) => {
  const orderItem = await orderDao.getDirectOrder(userId, productId, quantity);
  const deliveryFee = await calculationForDeliveryPrice(cartItems);
  const userInfo = await ordererInfo(userId);
  const basicAddress = await userBasicAddress(userId);

  const getOrderItem = { orderItem: orderItem };
  getOrderItem.deliveryPrice = deliveryFee;
  getOrderItem.ordererInfo = userInfo;

  if (basicAddress) {
    getOrderItem.userBasicAddress = basicAddress;
  }

  return getOrderItem;
};

const calculationForDeliveryPrice = async (cartItems) => {
  let delivery = 2500;
  let totalPriceForOneCart = 0;

  cartItems.forEach((el) => {
    totalPriceForOneCart += Number(el.totalProductPriceWithQuantity);
  });

  const deliveryPrice = totalPriceForOneCart < 40000 ? delivery : 0;

  return deliveryPrice;
};

const userBasicAddress = async (userId) => {
  const [info] = await orderDao.getAddressByUserId(userId);
  return info;
};

const ordererInfo = async (userId) => {
  const [ordererInfo] = await userDao.getUserByAccount(userId);
  return ordererInfo;
};

const getuserPoint = async (userId) => {
  const [userPoint] = await userDao.getPointByuserId(userId);
  return userPoint;
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
  const checkUserPoint = await getuserPoint(userId);

  if (Number(checkUserPoint.point) < Number(totalPrice)) {
    const error = new Error("YOU NEED MORE POINT!!");
    error.statusCode = 400;
    throw error;
  }

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
