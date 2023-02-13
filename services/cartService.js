const cartDao = require("../models/cartDao");

const cartIn = async (userId, productId, quantity) => {
  const productCartIn = await cartDao.cartIn(userId, productId, quantity);
  return productCartIn;
};

const showCart = async (userId) => {
  const userCart = await cartDao.showCart(userId);
  return userCart;
};

const deleteCart = async (userId, cartIdArr) => {
  const deleteProduct = await cartDao.deleteCart(userId, cartIdArr);
  return deleteProduct;
};

module.exports = {
  cartIn,
  showCart,
  deleteCart,
};
