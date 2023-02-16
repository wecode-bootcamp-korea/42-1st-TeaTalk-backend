const express = require("express");
const router = express.Router();

<<<<<<< HEAD
const userRouter = require("./userRouter");
const orderRouter = require("./orderRouter");

router.use("/users", userRouter.router);
router.use("/orders", orderRouter.router);
=======
const userRouter = require("./userRouter.js");
const productRouter = require("./productRouter.js");
const cartRouter = require("./cartRouter.js");

router.use("/users", userRouter.router);
router.use("/products", productRouter.router);
router.use("/cart", cartRouter.router);

>>>>>>> main
module.exports = router;
