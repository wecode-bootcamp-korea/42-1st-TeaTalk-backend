-- migrate:up
ALTER TABLE deliveries ADD user_id INT,
ADD receiver_zipcode INT NOT NULL,
ADD CONSTRAINT deliveries_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);
-- migrate:down
ALTER TABLE deliveries DROP user_id,
DROP receiver_zipcode;
