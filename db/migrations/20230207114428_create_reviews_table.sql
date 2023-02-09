-- migrate:up
CREATE TABLE reviews (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT,
  product_id INT,
  rating INT,
  comments VARCHAR(2700),
  order_id INT,
  CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT reviews_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id),
  CONSTRAINT reviews_order_id_fkey FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- migrate:down
DROP TABLE reviews;
