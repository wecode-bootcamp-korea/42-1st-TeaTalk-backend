const express = require("express");
const cartController = require("../controllers/cartController.js");

const router = express.Router();

router.post("/", cartController.cartIn);
router.get("/:userId", cartController.showCart);
router.delete("/", cartController.deleteCart);

module.exports = {
  router,
};
