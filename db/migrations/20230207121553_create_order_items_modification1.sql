-- migrate:up
ALTER TABLE order_items 
ADD CONSTRAINT order_items_user_id_ukey UNIQUE (user_id),
ADD CONSTRAINT order_items_product_id_ukey UNIQUE (product_id),
ADD CONSTRAINT order_items_cart_id_ukey UNIQUE (cart_id);
-- migrate:down
DROP TABLE order_items;
