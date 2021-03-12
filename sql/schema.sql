DROP DATABASE IF EXISTS restaurant_db;

CREATE DATABASE restaurant_db;

USE restaurant_db;

CREATE TABLE entrees(
	name VARCHAR(25) NOT NULL,
    description VARCHAR(100) NOT NULL,
    price FLOAT NOT NULL
);

CREATE TABLE drinks(
	name VARCHAR(25) NOT NULL,
    size VARCHAR(7) NOT NULL,
    price FLOAT NOT NULL
);
