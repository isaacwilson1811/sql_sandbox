-- include
SELECT * FROM t WHERE city IN('v','v','v')

-- between range
SELECT * FROM t WHERE price BETWEEN 10.00 AND 20.00;

-- order by
SELECT * FROM t ORDER BY lastname ASC;

-- order by
SELECT * FROM t ORDER BY lastname DESC;

-- like
SELECT * FROM WHERE productname LIKE 'Anton%';

SELECT * FROM WHERE productname LIKE '%Anton';

SELECT * FROM WHERE productname LIKE '%Anton%';