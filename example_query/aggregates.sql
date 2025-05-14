-- AS make an alias for a column
SELECT column AS differentnamedcolumn, c AS cdfdfdf
FROM tablename;

-- MIN() returns smallest value from column
SELECT MIN(c)
FROM t
WHERE condition

-- MAX() returns largest value from column
SELECT MAX(Price)
FROM t
WHERE condition

-- SUM adds all values in a column
SELECT SUM(c)
FROM t
WHERE condition

-- AVG() calculate average of values in column
SELECT AVG(c)
FROM t
WHERE condition