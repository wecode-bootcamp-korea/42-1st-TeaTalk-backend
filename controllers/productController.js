const productService = require("../services/productService");

const showDetail = async (req, res) => {
  try {
    const { productId } = req.params;
    const detail = await productService.showDetail(productId);
    res.status(200).json({ data: detail });
    if (!productId) {
      const err = new Error("Invalid product's Number");
      err.statusCode = 400;
      throw err;
    }
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
};

module.exports = {
  showDetail,
};
