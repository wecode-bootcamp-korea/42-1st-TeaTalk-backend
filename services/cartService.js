const cartDao = require("../models/cartDao");

const addProductToCart = async (userId, productId, quantity) => {
  const productCartIn = await cartDao.addProductToCart(
    userId,
    productId,
    quantity
  );
  return productCartIn;
};

const showCartOfUser = async (userId) => {
  const userCart = await cartDao.showCartOfUser(userId);
  return userCart;
};

const deleteCartById = async (userId, cartId) => {
  const deleteProduct = await cartDao.deleteCartById(userId, cartId);
  return deleteProduct;
};

module.exports = {
  addProductToCart,
  showCartOfUser,
  deleteCartById,
};
