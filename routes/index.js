const express = require("express");
const router = express.Router();

const productRouter = require("./productRouter.js");

router.use("/products", productRouter.router);

module.exports = router;
