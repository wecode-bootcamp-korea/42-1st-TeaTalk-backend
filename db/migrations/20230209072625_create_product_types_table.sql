-- migrate:up
CREATE TABLE product_types (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  type VARCHAR(255) NOT NULL,
  CONSTRAINT product_types_type_ukey UNIQUE (type)
);

-- migrate:down
DROP TABLE product_types;
