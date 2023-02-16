-- migrate:up
ALTER TABLE order_items
  DROP CONSTRAINT order_items_cart_id_ukey,
  DROP CONSTRAINT order_items_cart_id_fkey,
  DROP cart_id;

-- migrate:down

