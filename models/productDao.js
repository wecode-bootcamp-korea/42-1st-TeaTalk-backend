const { teaDataSource } = require("./datasource.js");

const getProducts = async (start, pageSize, category, sub, typeArr, sort) => {
  let whereCondition = category ? `WHERE` : typeArr ? `WHERE` : "";
  let subAndCondition = category ? `AND` : "";
  let andCondition = category && typeArr ? `AND` : sub && typeArr ? `AND` : "";
  const categoryCondition = category ? `c.name='${category}'` : "";
  const subCondition = sub ? `s.name='${sub}'` : "";

  const typeCondition = typeArr
    ? `INNER JOIN product_types t ON p.product_type_id = t.id`
    : "";
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
  console.log(typeCondition);
  console.log(whereCondition);
  console.log(categoryCondition);
  console.log(subCondition);
  console.log("and", andCondition);
  console.log("type:", typeArrCondition);
  console.log("이거냐:", sortCondition);
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
        ${subAndCondition}
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
