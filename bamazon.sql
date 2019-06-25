DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

-- item_id (unique id for each product)
-- product_name (Name of product)
-- department_name
-- price (cost to customer)
-- stock_quantity (how much of the product is available in stores)

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INTEGER(10) NULL,
    PRIMARY KEY(id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Jenga", "Board Games", 10.50, 55), ("Sorry!", "Board Games", 12.75, 40), ("Echo Dot", "Technology", 49.50, 50), ("Kindle", "Technology", 65, 38), ("Just Dance", "Video Games", 39.99, 62), ("Outriders", "Video Games", 59.99, 28), ("Beoming", "Books", 30.99, 22), ("Elevation", "Books", 15, 18), ("Argan Oil Hair Mask", "Hair Products", 14.99, 70), ("Flat Iron", "Hair Products", 29.99, 35);