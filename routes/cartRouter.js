const express = require("express");
const cartController = require("../controllers/cartController.js");

const router = express.Router();

router.post("/", cartController.addProductToCart);
router.get("/:userId", cartController.showCartOfUser);
router.delete("/", cartController.deleteCartById);

module.exports = {
  router,
};
