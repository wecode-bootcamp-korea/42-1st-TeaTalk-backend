-- migrate:up
ALTER TABLE products
  ADD product_types_id INT,
  ADD created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP;

-- migrate:down
ALTER TABLE products
  DROP COLUMN product_types_id,
  DROP COLUMN created_at,
  DROP COLUMN updated_at;
