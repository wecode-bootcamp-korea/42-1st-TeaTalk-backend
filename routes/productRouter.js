const express = require("express");
const productController = require("../controllers/productController.js");

const router = express.Router();

router.get("/detail/:productId", productController.showDetail);
router.post("/cartIn", productController.cartIn);

module.exports = {
  router,
};
