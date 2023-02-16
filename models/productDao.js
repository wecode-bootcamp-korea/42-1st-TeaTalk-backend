const { teaDataSource } = require("./datasource.js");

const getProductList = async (
  offset,
  categoryId,
  subCategoryId,
  typeArr,
  sort
) => {
  const typeCondition = typeArr
    ? `INNER JOIN product_types t ON p.product_type_id = t.id`
    : "";

  let whereCondition = "";
  if (categoryId || typeArr) {
    whereCondition = "WHERE";
  }

  const categoryCondition = categoryId ? `c.name='${categoryId}'` : "";
  const subCondition = subCategoryId ? `AND s.name='${subCategoryId}'` : "";

  let andCondition = "";
  if ((categoryId && typeArr) || (subCategoryId && typeArr)) {
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
        p.id AS productId,
        p.name AS productName,
        p.price AS productPrice,
        p.discount_price AS productDiscountPrice,
        p.image_url AS productMainImage, 
        pi.images
      FROM products AS p
      LEFT JOIN(
        SELECT
          product_id,
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', id,
              'url', image_url
            )
          ) AS images
        FROM product_images GROUP BY product_id
      ) AS pi ON p.id = pi.product_id
      INNER JOIN subcategories AS s ON p.subcategory_id = s.id
      INNER JOIN categories AS c ON s.category_id = c.id
      ${typeCondition}
      ${whereCondition}
      ${categoryCondition}
      ${subCondition}
      ${andCondition}
      ${typeArrCondition}
      ${sortCondition}
      LIMIT ?,8`,
    [offset]
  );
};

const getProductById = async (productId) => {
  return await teaDataSource.query(
    `SELECT
      p.id AS productId,
      p.name AS productName,
      p.description AS description,
      p.price AS productPrice,
      p.discount_price AS discountPrice,
      p.image_url AS productMainImage,
      s.name AS subcategoryName,
      c.name AS categoryName,
      pi.images
    FROM products AS p
    LEFT JOIN (
      SELECT 
        product_id, 
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', id, 
            'url', image_url
          )
        ) AS images 
      FROM product_images GROUP BY product_id
    ) AS pi ON pi.product_id = p.id
    INNER JOIN subcategories AS s ON p.subcategory_id = s.id
    INNER JOIN categories AS c ON s.category_id = c.id
    WHERE p.id = ?;`,
    [productId]
  );
};

module.exports = {
  getProductList,
  getProductById,
};
