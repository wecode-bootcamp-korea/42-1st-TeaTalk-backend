const express = require("express");
const router = express.Router();

const productRouter = require("./productRouter.js");
const userRouter = require("./userRouter.js");

router.use("/products", productRouter.router);
router.use("/users", userRouter.router);

module.exports = router;
