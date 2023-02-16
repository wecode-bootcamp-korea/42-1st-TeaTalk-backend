const express = require("express");

const orderController = require("../controllers/orderController.js");
const { loginRequired } = require("../middlewares/auth.js");
const router = express.Router();

router.get("/carts", loginRequired, orderController.getOrders);
router.get("/:productId", loginRequired, orderController.getDirectOrder);

router.post("/payment", loginRequired, orderController.createOrders);

module.exports = {
  router,
};
