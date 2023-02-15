const express = require("express");

const orderController = require("../controllers/orderController.js");
const { loginRequired } = require("../middlewares/auth.js");
const router = express.Router();

router.get("/carts", loginRequired, orderController.getOrderPageForCartItems);
router.post("/carts/result", loginRequired, orderController.orderResult);

module.exports = {
  router,
};
