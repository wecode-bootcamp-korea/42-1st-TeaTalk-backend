const { teaDataSource } = require("./datasource.js");

const getProduct = async (start, pageSize, category, sub) => {
  const categoryCondition = category ? `WHERE c.name='${category}'` : "";
  const subCondition = sub ? `AND s.name='${sub}'` : "";
  console.log(categoryCondition);
  console.log(subCondition);
  return await teaDataSource.query(
    `SELECT
        p.name,
        p.price,
        p.discount_price
        FROM
        products p
        INNER JOIN subcategories s
        ON p.subcategory_id = s.id
        INNER JOIN categories c
        ON s.category_id = c.id
        ${categoryCondition}
        ${subCondition}
        LIMIT ?,?`,
    [start, pageSize]
  );
};

const moreThanProducts = async () => {
  return await teaDataSource.query(
    `SELECT
      count(*)
    FROM
    products`
  );
};

module.exports = {
  getProduct,
  moreThanProducts,
};
