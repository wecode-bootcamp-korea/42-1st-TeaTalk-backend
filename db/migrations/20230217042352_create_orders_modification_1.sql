-- migrate:up
ALTER TABLE orders
  DROP CONSTRAINT orders_delivery_id_fkey,
  DROP CONSTRAINT orders_delivery_id_ukey,
  ADD CONSTRAINT orders_delivery_id_fkey1 FOREIGN KEY (delivery_id) REFERENCES deliveries(id);

-- migrate:down

