const productService = require("../services/productService");

const getProductById = async (req, res) => {
  const { categoryId, subCategoryId, type, sort, offset = 1 } = req.query;
  try {
    const lists = await productService.getProductById(
      +offset,
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

module.exports = {
  getProductById,
};
