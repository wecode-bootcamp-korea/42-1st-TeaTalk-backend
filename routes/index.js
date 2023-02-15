const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter.js");
const productRouter = require("./productRouter.js");
const cartRouter = require("./cartRouter.js");

router.use("/users", userRouter.router);
router.use("/products", productRouter.router);
router.use("/cart", cartRouter.router);

module.exports = router;
