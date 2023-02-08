-- migrate:up
ALTER TABLE users DROP address;

-- migrate:down
ALTER TABLE users ADD address varchar(255);
