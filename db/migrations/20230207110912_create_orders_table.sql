-- migrate:up
CREATE TABLE orders (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  price_amount int,
  delivery_price decimal,
  delivery_id int,
  CONSTRAINT orders_delivery_id_fkey FOREIGN KEY (delivery_id) REFERENCES deliveries(id)
);

-- migrate:down
DROP TABLE orders;
