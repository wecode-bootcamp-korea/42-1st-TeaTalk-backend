const express = require("express");
const cartController = require("../controllers/cartController.js");

const router = express.Router();
const { loginRequired } = require("../middlewares/auth.js");

router.post("/", loginRequired, cartController.addProductToCart);
router.get("/", loginRequired, cartController.getCartsByUserId);
router.delete("/", loginRequired, cartController.deleteCartById);

module.exports = {
  router,
};
