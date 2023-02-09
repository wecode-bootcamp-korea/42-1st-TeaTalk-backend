const productDao = require("../models/productDao.js");

const allProducts = async (page, pageSize, category, sub) => {
  let start = 0;
  if (page <= 0) {
    page = 1;
  } else {
    start = (page - 1) * pageSize;
  }
  const moreThanProducts = await productDao.moreThanProducts();
  if (page > Math.ceil(moreThanProducts[0]["count(*)"] / pageSize)) {
    const err = new Error("제품이 없습니다.");
    err.statusCode = 400;
    throw err;
  }
  console.log("서비스: ", category);
  console.log("서비스 : ", sub);
  const getProduct = await productDao.getProduct(
    start,
    pageSize,
    category,
    sub
  );
  return getProduct;
};

module.exports = {
  allProducts,
};
