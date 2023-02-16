const productDao = require("../models/productDao");

const getProductList = async (page, categoryId, subCategoryId, type, sort) => {
  let offset = 0;
  if (page <= 0) {
    offset = 0;
  } else {
    offset = (page - 1) * 8;
  }
  const typeArr = type ? type.split(",") : "";
  const result = await productDao.getProductList(
    offset,
    categoryId,
    subCategoryId,
    typeArr,
    sort
  );
  return result;
};

const getProductById = async (productId) => {
  const productDetail = await productDao.getProductById(productId);
  return productDetail;
};

module.exports = {
  getProductList,
  getProductById,
};
