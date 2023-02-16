const productService = require("../services/productService");

const getProductList = async (req, res) => {
  const { categoryId, subCategoryId, type, sort, page = 1 } = req.query;
  try {
    const lists = await productService.getProductList(
      +page,
      categoryId,
      subCategoryId,
      type,
      sort
    );
    res.status(200).json({ data: lists });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      const err = new Error("Invalid product's Number");
      err.statusCode = 400;
      throw err;
    }
    const detail = await productService.getProductById(productId);
    res.status(200).json({ data: detail });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
};

module.exports = {
  getProductList,
  getProductById,
};
