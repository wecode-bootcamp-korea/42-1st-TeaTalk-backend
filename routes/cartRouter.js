const express = require("express");
const cartController = require("../controllers/cartController.js");

const router = express.Router();

router.post("/", cartController.cartIn);

module.exports = {
  router,
};
