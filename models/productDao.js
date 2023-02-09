const { teaDataSource } = require("./datasource.js");

const getProduct = async (start, pageSize, category, sub, type) => {
  const categoryCondition = category ? `WHERE c.name='${category}'` : "";
  const subCondition = sub ? `AND s.name='${sub}'` : "";
  const typeCondition = type[0]
    ? type[1]
      ? type[2]
        ? type[3]
          ? `AND (t.type='${type[0]}' OR t.type='${type[1]}' OR t.type='${type[2]}',t.type='${type[3]}')`
          : `AND (t.type='${type[0]}' OR t.type='${type[1]}' OR t.type='${type[2]}')`
        : `AND (t.type='${type[0]}' OR t.type='${type[1]}')`
      : `AND (t.type='${type[0]}')`
    : "";
  console.log(typeCondition);
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
        INNER JOIN product_types t
        ON p.product_types_id = t.id
        ${categoryCondition}
        ${subCondition}
        ${typeCondition}
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
