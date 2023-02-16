const productDao = require("../models/productDao");

const getProductList = async (page, categoryId, subCategoryId, type, sort) => {
  let offset;
  page ? (offset = (page - 1) * 8) : (offset = 0);

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
  return await productDao.getProductById(productId);
};

module.exports = {
  getProductList,
  getProductById,
};
