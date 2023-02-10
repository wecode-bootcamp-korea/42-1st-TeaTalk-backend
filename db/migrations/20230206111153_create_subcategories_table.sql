-- migrate:up
CREATE TABLE subcategories (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  category_id INT,
  CONSTRAINT subcategories_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id),
  CONSTRAINT subcategories_name_ukey UNIQUE (name)
);

-- migrate:down
DROP TABLE subcategories;
