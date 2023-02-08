-- migrate:up
CREATE TABLE orders (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  price_amount int,
  delivery_price decimal(10,2),
  delivery_id int,
  CONSTRAINT orders_delivery_id_fkey FOREIGN KEY (delivery_id) REFERENCES deliveries(id),
  CONSTRAINT orders_delivery_id_ukey UNIQUE (delivery_id),
  CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);

-- migrate:down
DROP TABLE orders;
