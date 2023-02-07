-- migrate:up
CREATE TABLE reviews (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id int,
  product_id int,
  marks int,
  comments varchar(2700),
  order_id int,
  CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT reviews_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id),
  CONSTRAINT reviews_order_id_fkey FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- migrate:down
DROP TABLE reviews;
