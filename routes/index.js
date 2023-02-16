const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter.js");
const productRouter = require("./productRouter.js");
const cartRouter = require("./cartRouter.js");
const orderRouter = require("./orderRouter");

router.use("/users", userRouter.router);
router.use("/products", productRouter.router);
router.use("/cart", cartRouter.router);
router.use("/orders", orderRouter.router);

module.exports = router;
