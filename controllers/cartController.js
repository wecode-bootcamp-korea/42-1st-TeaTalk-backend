const cartService = require("../services/cartService");

const cartIn = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || !quantity) {
      const err = new Error("Invalid user's Id or quantity");
      err.statusCode = 400;
      throw err;
    }
    const cart = await cartService.cartIn(userId, productId, quantity);
    res.status(200).json({ message: "상품이 장바구니에 추가되었습니다." });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
};

const showCart = async (req, res) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      const err = new Error("Please type correct userId");
      err.statusCode = 400;
      throw err;
    }
    const userCart = await cartService.showCart(userId);
    if (userCart === []) {
      res.status(200).json({ message: "상품이 없습니다!" });
    } else {
      res.status(200).json({ cart: userCart });
    }
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
};

const deleteCart = async (req, res) => {
  const { userId, cartId } = req.body;
  const cartIdArr = cartId ? cartId.split(",") : [];
  const deleteProduct = await cartService.deleteCart(userId, cartIdArr);
  const userCart = await cartService.showCart(userId);
  if (userCart.length === 0) {
    res.status(200).json({ message: "상품이 없습니다!" });
  } else {
    res.status(200).json({ cart: userCart });
  }
};

module.exports = {
  cartIn,
  showCart,
  deleteCart,
};
