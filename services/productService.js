const productDao = require("../models/productDao");

const getProductById = async (productId) => {
  const productDetail = await productDao.getProductById(productId);
  return productDetail;
};

module.exports = {
  getProductById,
};
