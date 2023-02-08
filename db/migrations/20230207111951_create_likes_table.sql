-- migrate:up
CREATE TABLE likes (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id int,
  product_id int,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT likes_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id)
);


-- migrate:down
DROP TABLE likes;
