const express = require("express");
const productController = require("../controllers/productController.js");

const router = express.Router();

router.get("/list", productController.allProducts);

module.exports = {
  router,
};
