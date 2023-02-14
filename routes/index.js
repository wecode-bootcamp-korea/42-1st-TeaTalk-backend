const express = require("express");
const router = express.Router();

const cartRouter = require("./cartRouter.js");
const userRouter = require("./userRouter.js");

router.use("/cart", cartRouter.router);
router.use("/users", userRouter.router);

module.exports = router;
