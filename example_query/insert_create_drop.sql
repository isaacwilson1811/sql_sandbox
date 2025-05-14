-- add a record to a table, which columns and what values
INSERT INTO t (c1,c2,c3,)
VALUES (v1,v2,v3);

-- create a table
CREATE TABLE t (
    column1 datatype constraint,
    column2 datatype constraint
);
--constraints
-- NOT NULL
-- UNIQUE
-- PRIMARY KEY
-- CHECK
-- DEFAULT
-- INT / INTEGER
-- VARCHAR(255) / TEXT
-- DECIMAL(10, 2) / REAL
-- CREATE INDEX
-- DEFAULT

DROP TABLE t;



-- In Class Activity INSERT, CREATE TABLE, DROP

--Add in Frozen Goods as a category with an explanation of Frozen Foods and Desserts
INSERT INTO Categories (CategoryName, Description)
VALUES ('Frozen Goods', 'Frozen Foods');

--Add Groot and Rocket as new employees
-- with a note that they are only temporary employees
-- and any other facts you feel need to be included in the notes
INSERT INTO Employees (LastName, FirstName, BirthDate, Notes)
VALUES ('Groot', NULL, NULL, 'Temporary Employee. Full Information Unknown');

INSERT INTO Employees (LastName, FirstName, BirthDate, Notes)
VALUES ('Rocket', NULL, NULL, 'Temporary Employee. Full Information Unknown');

-- Create a Characters table with columns ID (primary key), Name, Special, Best Move
-- Add to your table 3 records
CREATE TABLE monsters (
    monsterID INT PRIMARY KEY,
    name VARCHAR,
    ability VARCHAR,
    bestMove VARCHAR
);

INSERT INTO monsters (monsterID, name, ability, bestMove)
VALUES (1, 'Rat', 'Poison', 'Bacteria Bite');

INSERT INTO monsters (monsterID, name, ability, bestMove)
VALUES (2, 'Skeleton', 'Undead', 'Bone Blast');

INSERT INTO monsters (monsterID, name, ability, bestMove)
VALUES (3, 'Slime', 'Multiply', 'Spew Goop');

-- delete monsters table
-- delete db named monsters
DROP TABLE monsters;
DROP DATABASE monsters;
