-- migrate:up
CREATE TABLE categories (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  CONSTRAINT categories_name_ukey UNIQUE (name)
);

-- migrate:down
DROP TABLE categories;
