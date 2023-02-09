-- migrate:up
CREATE TABLE deliveries (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  receiver_name VARCHAR(255) NOT NULL,
  receiver_phone_number int NOT NULL,
  receiver_zipcode int NOT NULL,
  receiver_address VARCHAR(500) NOT NULL,
  delivery_message VARCHAR(255),
  CONSTRAINT deliveries_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);

-- migrate:down
DROP TABLE deliveries;
