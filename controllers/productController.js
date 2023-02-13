const productService = require("../services/productService");

const getProducts = async (req, res) => {
  const { category, sub, type, sort, page } = req.query;
  const pageNum = parseInt(page);
  const pageSize = 12;
  try {
    if (!page) {
      pageNum = 1;
    }
    const lists = await productService.getProducts(
      pageNum,
      pageSize,
      category,
      sub,
      type,
      sort
    );

    res.status(200).json({ data: lists });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
};

module.exports = {
  getProducts,
};
