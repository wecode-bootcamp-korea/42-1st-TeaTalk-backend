-- migrate:up
ALTER TABLE likes
  ADD CONSTRAINT likes_user_id_product_id_ukey UNIQUE (user_id, product_id);

-- migrate:down
ALTER TABLE likes
  DROP CONSTRAINT likes_user_id_product_id_ukey;
