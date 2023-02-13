const { teaDataSource } = require("./database.js");

const productDetail = async (productId) => {
  return await teaDataSource.query(
    `SELECT
      p.name AS Product_name,
      p.description AS Description,
      p.price AS Price,
      p.discount_price AS Discount_price,
      p.image_url as Title_image,
      JSON_ARRAYAGG(i.image_url) as Detail_image,
      s.name AS Subcategory_name,
      c.name AS Category_name
      from products p
      inner join product_images i
      on p.id = i.product_id
      inner join subcategories s
      on p.subcategory_id = s.id
      inner join categories c
      on s.category_id = c.id
      where p.id = ${productId}
      GROUP BY p.id;`
  );
};

const productCartIn = async (userId, productId, quantity) => {
  return await teaDataSource.query(
    `INSERT INTO 
      carts (
      user_id,
      product_id,
      quantity)
      VALUE (
        ?,
        ?,
        ?
      ) ON DUPLICATE KEY UPDATE
      quantity = quantity + ?;`,
    [userId, productId, quantity, quantity]
  );
};

module.exports = {
  productDetail,
  productCartIn,
};
