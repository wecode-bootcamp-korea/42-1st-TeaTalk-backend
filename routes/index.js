const express = require("express");
const router = express.Router();

const orderRouter = require("./orderRouter");
const productRouter = require("./productRouter.js");
const userRouter = require("./userRouter.js");

router.use("/products", productRouter.router);

router.use("/users", userRouter.router);

router.use("/orders", orderRouter.router);

module.exports = router;
