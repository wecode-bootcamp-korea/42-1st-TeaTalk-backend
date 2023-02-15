const productService = require("../services/productService");

const getProductByID = async (req, res) => {
  const { category, sub, type, sort, offset = 1 } = req.query;
  const limit = 12;
  try {
    const lists = await productService.getProductByID(
      +offset,
      limit,
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
  getProductByID,
};
