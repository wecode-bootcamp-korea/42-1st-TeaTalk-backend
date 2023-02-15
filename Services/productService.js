const productDao = require("../models/productDao");

const getProductList = async (
  offset,
  categoryId,
  subCategoryId,
  type,
  sort
) => {
  let start = 0;
  const limit = 12;
  if (offset <= 0) {
    offset = 1;
  } else {
    start = (offset - 1) * limit;
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
