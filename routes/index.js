const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter.js");
const productRouter = require("./productRouter.js");

router.use("/users", userRouter.router);
router.use("/products", productRouter.router);

module.exports = router;
