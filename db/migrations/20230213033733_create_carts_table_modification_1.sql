-- migrate:up
ALTER TABLE carts
  ADD CONSTRAINT carts_user_id_product_id_ukey UNIQUE (user_id, product_id);

-- migrate:down
ALTER TABLE carts
  DROP CONSTRAINT carts_user_id_product_id_ukey;