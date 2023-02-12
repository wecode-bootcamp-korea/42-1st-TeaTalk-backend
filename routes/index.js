const express = require("express");
const router = express.Router();

const cartRouter = require("./cartRouter.js");

router.use("/cart", cartRouter.router);

module.exports = router;
