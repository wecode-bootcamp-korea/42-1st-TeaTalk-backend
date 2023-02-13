const productDao = require("../models/productDao");

const showDetail = async (productId) => {
  const productDetail = await productDao.productDetail(productId);
  return productDetail;
};

const cartIn = async (userId, productId, quantity) => {
  const productCartIn = await productDao.productCartIn(
    userId,
    productId,
    quantity
  );
  return productCartIn;
};

module.exports = {
  showDetail,
  cartIn,
};
