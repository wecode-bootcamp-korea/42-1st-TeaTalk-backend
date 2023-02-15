const orderDao = require("../models/orderDao");
const userDao = require("../models/userDao");

const getOrderPageForCartItems = async (userId) => {
  const cartItems = await orderDao.getOrderPageForCartItems(userId);
  const deliveryPrice = await calculationForDeliveryPrice(cartItems);
  const userInfo = await ordererInfo(userId);
  const info = await userBasicAddress(userId);

  const finalCart = { cartItems: cartItems };
  finalCart.deliveryPrice = deliveryPrice;
  finalCart.ordererInfo = userInfo;

  if (info) {
    finalCart.userBasicAddress = info;
  }

  return finalCart;
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
  const [info] = await orderDao.addressInfo(userId);
  return info;
};

const ordererInfo = async (userId) => {
  const [ordererInfo] = await userDao.getUserByAccount(userId);
  return ordererInfo;
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
  return await orderDao.orderResult(
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
  getOrderPageForCartItems,
  orderResult,
};
