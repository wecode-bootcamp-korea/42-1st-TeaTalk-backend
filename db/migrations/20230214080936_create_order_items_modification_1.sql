-- migrate:up
ALTER TABLE order_items
  DROP CONSTRAINT order_items_product_id_fkey,
  DROP CONSTRAINT order_items_product_id_ukey,
  ADD CONSTRAINT order_items_product_id_fkey1 FOREIGN KEY (product_id) REFERENCES products(id);

-- migrate:down
