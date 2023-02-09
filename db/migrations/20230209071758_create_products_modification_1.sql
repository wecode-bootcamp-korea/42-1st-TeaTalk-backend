-- migrate:up
ALTER TABLE products
  ADD product_type_id INT,
  ADD created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT products_product_type_id_fkey FOREIGN KEY (product_type_id) REFERENCES product_types(id)

-- migrate:down
ALTER TABLE products
  DROP CONSTRAINT products_product_type_id_fkey,
  DROP COLUMN product_types_id,
  DROP COLUMN created_at,
  DROP COLUMN updated_at;
