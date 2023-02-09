-- migrate:up
CREATE TABLE product_images (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  product_id INT,
  image_name VARCHAR(255),
  image_url VARCHAR(2700),
  CONSTRAINT product_images_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id)
);

-- migrate:down
DROP TABLE product_images;
