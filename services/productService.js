const productDao = require("../models/productDao.js");

const getProducts = async (pageNum, pageSize, category, sub, type, sort) => {
  let start = 0;
  if (pageNum <= 0) {
    pageNum = 1;
  } else {
    start = (pageNum - 1) * pageSize;
  }
  const typeArr = type ? type.split(",") : "";
  const productCounts = await productDao.getProductCounts();
  if (pageNum > Math.ceil(productCounts[0].counts / pageSize)) {
    const err = new Error("제품이 없습니다.");
    err.statusCode = 400;
    throw err;
  }
  const result = await productDao.getProducts(
    start,
    pageSize,
    category,
    sub,
    typeArr,
    sort
  );
  return result;
};

module.exports = {
  getProducts,
};
