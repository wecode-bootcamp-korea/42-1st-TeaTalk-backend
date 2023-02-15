const { teaDataSource } = require("./datasource.js");

const getProductById = async (productId) => {
  return await teaDataSource.query(
    `SELECT
      p.name AS product_name,
      p.description AS description,
      p.price AS price,
      p.discount_price AS discount_price,
      p.image_url AS title_image,
      s.name AS subcategory_name,
      c.name AS category_name,
      pi.images
    FROM products AS p
    LEFT JOIN (
      SELECT product_id, JSON_ARRAYAGG(JSON_OBJECT('id', id, 'url', image_url)) AS images 
      FROM product_images GROUP BY product_id
    ) AS pi ON pi.product_id = p.id
    INNER JOIN subcategories AS s ON p.subcategory_id = s.id
    INNER JOIN categories AS c ON s.category_id = c.id
    WHERE p.id = ?;`,
    [productId]
  );
};

module.exports = {
  getProductById,
};
