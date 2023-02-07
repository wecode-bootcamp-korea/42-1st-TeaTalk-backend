-- migrate:up
ALTER TABLE orders ADD CONSTRAINT orders_delivery_id_ukey UNIQUE (delivery_id);

-- migrate:down
DROP TABLE orders;
