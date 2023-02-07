-- migrate:up
CREATE TABLE deliveries (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  receiver_name varchar(255) NOT NULL,
  receiver_phone_number int NOT NULL,
  receiver_address varchar(500) NOT NULL,
  delivery_message varchar(255)
);

-- migrate:down
DROP TABLE deliveries;
