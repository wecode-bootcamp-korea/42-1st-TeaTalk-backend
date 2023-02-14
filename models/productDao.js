const { teaDataSource } = require("./database.js");

const getProductById = async (productId) => {
  return await teaDataSource.query(
    `SELECT
      p.name AS product_name,
      p.description AS description,
      p.price AS price,
      p.discount_price AS discount_price,
      p.image_url as title_image,
      JSON_ARRAYAGG(i.image_url) as detail_image,
      s.name AS subcategory_name,
      c.name AS category_name
    FROM products p
    INNER JOIN product_images i ON p.id = i.product_id
    INNER JOIN subcategories s ON p.subcategory_id = s.id
    INNER JOIN categories c ON s.category_id = c.id
    WHERE p.id = ?
    GROUP BY p.id;`,
    [productId]
  );
};

module.exports = {
  getProductById,
};
