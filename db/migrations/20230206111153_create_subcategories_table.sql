-- migrate:up
CREATE TABLE subcategories (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  category_id int,
  CONSTRAINT subcategories_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id),
  CONSTRAINT subcategories_name_ukey UNIQUE (name)
);

-- migrate:down
DROP TABLE subcategories;
