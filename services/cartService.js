const cartDao = require("../models/cartDao");

const createCart = async (userId, productId, quantity) => {
  const productCartIn = await cartDao.createCart(userId, productId, quantity);
  return productCartIn;
};

const getCartsByUserId = async (userId) => {
  const userCart = await cartDao.getCartsByUserId(userId);
  return userCart;
};

const deleteCartById = async (userId, cartId) => {
  const deleteProduct = await cartDao.deleteCartById(userId, cartId);
  return deleteProduct;
};

module.exports = {
  createCart,
  getCartsByUserId,
  deleteCartById,
};
