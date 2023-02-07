-- migrate:up
CREATE TABLE product_images (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  product_id int,
  img_name varchar(255),
  image_url varchar(2700),
  CONSTRAINT product_images_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id)
);

-- migrate:down
DROP TABLE product_images;
