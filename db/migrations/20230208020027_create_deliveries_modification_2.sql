-- migrate:up
ALTER TABLE deliveries MODIFY user_id INT NOT NULL;

-- migrate:down
ALTER TABLE deliveries DROP CONSTRAINT deliveries_user_id_fkey;