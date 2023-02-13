const productService = require("../services/productService");

const showDetail = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      const err = new Error("Invalid product's Number");
      err.statusCode = 400;
      throw err;
    }
    const detail = await productService.showDetail(productId);
    res.status(200).json({ data: detail });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
};

const cartIn = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || !quantity) {
      const err = new Error("Invalid user's Id or quantity");
      err.statusCode = 400;
      throw err;
    }
    const cart = await productService.cartIn(userId, productId, quantity);
    res.status(200).json({ meesage: "상품이 장바구니에 추가되었습니다." });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
};

module.exports = {
  showDetail,
  cartIn,
};
