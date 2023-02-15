const productDao = require("../models/productDao.js");

const getProductByID = async (offset, limit, category, sub, type, sort) => {
  let start = 0;
  if (offset <= 0) {
    offset = 1;
  } else {
    start = (offset - 1) * limit;
  }
  const typeArr = type ? type.split(",") : "";
  const result = await productDao.getProductByID(
    start,
    limit,
    category,
    sub,
    typeArr,
    sort
  );
  return result;
};

module.exports = {
  getProductByID,
};
