-- 1-Create a table named Vehicles
-- with 4 columns
-- With an ID column as a primary key
-- year make model
-- Create at least 5 rows.

CREATE TABLE vehicles (
    vID INT PRIMARY KEY,
    year DATE,
    make VARCHAR,
    model VARCHAR
);

INSERT INTO vehicles (vID, year, make, model)
VALUES (1, 'year', 'make', 'model');