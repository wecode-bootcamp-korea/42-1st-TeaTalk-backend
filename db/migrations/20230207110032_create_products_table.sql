-- migrate:up
CREATE TABLE products (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(2700),
  subcategory_id INT NOT NULL,
  price DECIMAL(10,2),
  discount_price DECIMAL(10,2),
  image_url VARCHAR(2700),
  is_gift BOOLEAN,
  CONSTRAINT products_name_ukey UNIQUE (name),
  CONSTRAINT products_subcategory_id_fkey FOREIGN KEY (subcategory_id) REFERENCES subcategories(id)
);

-- migrate:down
DROP TABLE products;
