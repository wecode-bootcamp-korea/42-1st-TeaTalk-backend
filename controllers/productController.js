const productService = require("../services/productService");

const allProducts = async (req, res) => {
  const pageInfo = req.query;
  const page = parseInt(pageInfo.page);
  const pageSize = parseInt(pageInfo.pageSize);
  const category = pageInfo.category;
  const sub = pageInfo.sub;
  const ty = pageInfo.type;
  const type = ty ? ty.split(",") : [];
  console.log(type);
  try {
    if (!page || !pageSize) {
      return res.status(404).json({ message: "Page_ERROR" });
    }
    const lists = await productService.allProducts(
      page,
      pageSize,
      category,
      sub,
      type
    );

    res.status(200).json({ data: lists });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
};

module.exports = {
  allProducts,
};
