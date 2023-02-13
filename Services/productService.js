const productDao = require("../models/productDao");

const showDetail = async (productId) => {
  const productDetail = await productDao.productDetail(productId);
  return productDetail;
};

module.exports = {
  showDetail,
};
