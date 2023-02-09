-- migrate:up
CREATE TABLE users (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  identification VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  password BINARY(72) NOT NULL,
  birthdate VARCHAR(255),
  gender VARCHAR(255),
  point DECIMAL(10,2) NOT NULL DEFAULT 1000000,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT users_email_ukey UNIQUE (email),
  CONSTRAINT users_identification_ukey UNIQUE (identification),
  CONSTRAINT users_phone_number_ukey UNIQUE (phone_number)
);

-- migrate:down
DROP TABLE users;
