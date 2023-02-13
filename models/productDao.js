const { teaDataSource } = require("./datasource.js");

const getProducts = async (start, pageSize, category, sub, typeArr, sort) => {
  let whereCondition = category ? `WHERE` : typeArr ? `WHERE` : "";
  let andCondition = category && typeArr ? `AND` : sub && typeArr ? `AND` : "";
  const categoryCondition = category ? `c.name='${category}'` : "";
  const subCondition = sub ? `AND s.name='${sub}'` : "";
  const typeCondition = typeArr
    ? `INNER JOIN product_types t ON p.product_type_id = t.id`
    : "";
  const typeArrCondition = typeArr[0]
    ? typeArr[1]
      ? typeArr[2]
        ? typeArr[3]
          ? `(t.type='${typeArr[0]}' OR t.type='${typeArr[1]}' OR t.type='${typeArr[2]}',t.type='${typeArr[3]}')`
          : `(t.type='${typeArr[0]}' OR t.type='${typeArr[1]}' OR t.type='${typeArr[2]}')`
        : `(t.type='${typeArr[0]}' OR t.type='${typeArr[1]}')`
      : `(t.type='${typeArr[0]}')`
    : "";
  const sortSet = {
    new_arrival: `ORDER BY p.created_at DESC`,
    price_desc: `ORDER BY p.discount_price DESC`,
    price_asc: `ORDER BY p.discount_price ASC`,
  };
  const sortCondition = sortSet[sort];
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
        ${typeCondition}
        ${whereCondition}
        ${categoryCondition}
        ${subCondition}
        ${andCondition}
        ${typeArrCondition}
        ${sortCondition}
        LIMIT ?,?`,
    [start, pageSize]
  );
};

const getProductCounts = async () => {
  return await teaDataSource.query(
    `SELECT
      count(id) as counts
    FROM
    products`
  );
};

module.exports = {
  getProducts,
  getProductCounts,
};
