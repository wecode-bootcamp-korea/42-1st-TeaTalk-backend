const express = require("express");
const productController = require("../controllers/productController.js");

const router = express.Router();

router.get("/detail/:productId", productController.showDetail);

module.exports = {
  router,
};
