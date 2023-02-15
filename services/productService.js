const productDao = require("../models/productDao.js");

const getProductById = async (
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
  const result = await productDao.getProductById(
    start,
    categoryId,
    subCategoryId,
    typeArr,
    sort
  );
  return result;
};

module.exports = {
  getProductById,
};
