const { teaDataSource } = require("./datasource.js");

const getProduct = async (start, pageSize, category, sub, type, sort) => {
  let whereCondition = category ? `WHERE` : type ? `WHERE` : "";
  let andCondition = category && type ? `AND` : sub && type ? `AND` : "";
  const categoryCondition = category ? `c.name='${category}'` : "";
  const subCondition = sub ? `AND s.name='${sub}'` : "";
  const typeCondition = type[0]
    ? type[1]
      ? type[2]
        ? type[3]
          ? `(t.type='${type[0]}' OR t.type='${type[1]}' OR t.type='${type[2]}',t.type='${type[3]}')`
          : `(t.type='${type[0]}' OR t.type='${type[1]}' OR t.type='${type[2]}')`
        : `(t.type='${type[0]}' OR t.type='${type[1]}')`
      : `(t.type='${type[0]}')`
    : "";
  let sortCondition = "";
  if (sort === "price_asc") {
    sortCondition = `ORDER BY p.discount_price ASC`;
  } else if (sort === "price_desc") {
    sortCondition = `ORDER BY p.discount_price DESC`;
  } else if (sort === "new_arrival") {
    sortCondition = `ORDER BY p.created_at DESC`;
  }
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
        ${whereCondition}
        ${categoryCondition}
        ${subCondition}
        ${andCondition}
        ${typeCondition}
        ${sortCondition}
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
