-- migrate:up
CREATE TABLE carts (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id int,
  product_id int,
  quantity int,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT carts_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id)
);

-- migrate:down
DROP TABLE carts;
