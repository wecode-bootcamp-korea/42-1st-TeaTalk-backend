-- migrate:up
CREATE TABLE likes (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT,
  product_id INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT likes_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id)
);


-- migrate:down
DROP TABLE likes;
