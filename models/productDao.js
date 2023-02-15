const { teaDataSource } = require("./datasource.js");

const getProducts = async (start, limit, category, sub, typeArr, sort) => {
  const typeCondition = typeArr
    ? `INNER JOIN product_types t ON p.product_type_id = t.id`
    : "";
  let whereCondition = "";
  if (category || typeArr) {
    whereCondition = "WHERE";
  }

  const categoryCondition = category ? `c.name='${category}'` : "";
  const subCondition = sub ? `AND s.name='${sub}'` : "";

  let andCondition = "";
  if ((category && typeArr) || (sub && typeArr)) {
    andCondition = "AND";
  }

  let typeArrCondition = "";
  for (let i = 0; i < typeArr.length; i++) {
    if (i === 0) {
      typeArrCondition = typeArrCondition + `(t.type='${typeArr[i]}'`;
    } else {
      typeArrCondition = typeArrCondition + ` OR t.type='${typeArr[i]}'`;
    }
    if (i === typeArr.length - 1) {
      typeArrCondition = typeArrCondition + `)`;
    }
  }

  let sortCondition = "";
  switch (sort) {
    case "new_arrival":
      sortCondition = `ORDER BY p.created_at DESC`;
      break;
    case "price_desc":
      sortCondition = `ORDER BY p.discount_price DESC`;
      break;
    case "price_asc":
      sortCondition = `ORDER BY p.discount_price ASC`;
      break;
    default:
      sortCondition = "";
      break;
  }
  return await teaDataSource.query(
    `SELECT
        p.name,
        p.price,
        p.discount_price
        FROM
        products AS p
        INNER JOIN subcategories AS s
        ON p.subcategory_id = s.id
        INNER JOIN categories AS c
        ON s.category_id = c.id
        ${typeCondition}
        ${whereCondition}
        ${categoryCondition}
        ${subCondition}
        ${andCondition}
        ${typeArrCondition}
        ${sortCondition}
        LIMIT ?,?`,
    [start, limit]
  );
};

module.exports = {
  getProducts,
};
