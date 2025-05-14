-- https://sqlite.org/fiddle/

CREATE TABLE customers (
    id INTEGER PRIMARY KEY UNIQUE,
    firstname TEXT,
    lastname TEXT
);

CREATE TABLE addrs (
    id INTEGER PRIMARY KEY UNIQUE,
    street_addrsess TEXT,
    city TEXT,
    st TEXT,
    zip INTEGER
);

CREATE TABLE menu (
    id INTEGER PRIMARY KEY UNIQUE,
    pizza_type TEXT,
    price REAL
);

CREATE TABLE orders (
    id INTEGER PRIMARY KEY UNIQUE,
    customer_id INTEGER,
    addrs_id INTEGER,
    menu_id INTEGER,
    FOREIGN KEY(customer_id, addrs_id, menu_id) REFERENCES customers(id), addrs(id), menu(id)
);

CREATE TABLE orders (
    id INTEGER PRIMARY KEY UNIQUE,
    customer_id INTEGER,
    addrs_id INTEGER,
    menu_id INTEGER,
    FOREIGN KEY(customer_id, addrs_id, menu_id) REFERENCES customers(id), addrs(id), menu(id)
);

