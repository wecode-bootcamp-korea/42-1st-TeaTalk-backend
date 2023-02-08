-- migrate:up
CREATE TABLE products (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  description varchar(2700),
  subcategory_id int NOT NULL,
  price decimal(10,2),
  discount_price decimal(10,2),
  image_url varchar(2700),
  is_gift boolean,
  CONSTRAINT products_name_ukey UNIQUE (name),
  CONSTRAINT products_subcategory_id_fkey FOREIGN KEY (subcategory_id) REFERENCES subcategories(id)
);

-- migrate:down
DROP TABLE products;
