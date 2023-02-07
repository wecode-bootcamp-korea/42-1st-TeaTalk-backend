-- migrate:up
CREATE TABLE users (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  identification varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  phone_number varchar(255) NOT NULL,
  password varchar(60) NOT NULL,
  birthdate varchar(255),
  address varchar(255),
  gender varchar(255),
  point decimal,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT users_email_ukey UNIQUE (email),
  CONSTRAINT users_identification_ukey UNIQUE (identification),
  CONSTRAINT users_phone_number_ukey UNIQUE (phone_number)
);

-- migrate:down
DROP TABLE users;
