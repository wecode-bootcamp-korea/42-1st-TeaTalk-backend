-- migrate:up
CREATE TABLE deliveries (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  receiver_name varchar(255) NOT NULL,
  receiver_phone_number int NOT NULL,
  receiver_zipcode int NOT NULL,
  receiver_address varchar(500) NOT NULL,
  delivery_message varchar(255),
  CONSTRAINT deliveries_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);

-- migrate:down
DROP TABLE deliveries;
