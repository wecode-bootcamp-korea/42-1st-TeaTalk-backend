const productDao = require("../models/productDao");

const getProductList = async (
  offset = 0,
  categoryId,
  subCategoryId,
  type,
  sort
) => {
  let start = 0;
  if (offset <= 0) {
    start = 0;
  } else {
    start = (offset - 1) * 12;
  }
  const typeArr = type ? type.split(",") : "";
  const result = await productDao.getProductList(
    start,
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
