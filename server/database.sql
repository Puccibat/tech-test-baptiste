CREATE DATABASE buynholddb;

CREATE TABLE users(
  _id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE orders(
  order_id SERIAL PRIMARY KEY,
  price NUMERIC NOT NULL,
  expirationDate DATE NOT NULL,
  username VARCHAR(255) NOT NULL
);