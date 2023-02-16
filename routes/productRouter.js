const express = require("express");
const productController = require("../controllers/productController.js");

const router = express.Router();

router.get("/", productController.getProductList);
router.get("/detail/:productId", productController.getProductById);

module.exports = {
  router,
};
