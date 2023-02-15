const cartService = require("../services/cartService");

const addProductToCart = async (req, res) => {
  try {
    const userId = req.user;
    const { productId, quantity } = req.body;
    if (!userId || !productId || !quantity) {
      const err = new Error("Invalid user's Id or quantity");
      err.statusCode = 400;
      throw err;
    }
    await cartService.addProductToCart(userId, productId, quantity);
    res.status(200).json({ message: "상품이 장바구니에 추가되었습니다." });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
};

const showCartOfUser = async (req, res) => {
  const userId = req.user;
  try {
    if (!userId) {
      const err = new Error("Please type correct userId");
      err.statusCode = 400;
      throw err;
    }
    const userCart = await cartService.showCartOfUser(userId);
    res.status(200).json({ cart: userCart });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
};

const deleteCartById = async (req, res) => {
  try {
    const userId = req.user;
    const { cartId } = req.body;
    if (cartId.length === 0) {
      const err = new Error("Didn't select cartId!");
      statusCode = 400;
      throw err;
    }
    await cartService.deleteCartById(userId, cartId);
    const userCart = await cartService.showCartOfUser(userId);
    res.status(200).json({ cart: userCart });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
};

module.exports = {
  addProductToCart,
  showCartOfUser,
  deleteCartById,
};
