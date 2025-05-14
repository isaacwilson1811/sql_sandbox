-- A JOIN clause is used to combine rows from two or more tables
-- based on a related column between them.
-- JOIN(s)
-- https://www.w3schools.com/sql/sql_join.asp

-- INNER JOIN
--example
--result t1.c1, t1.c2, t1.c3, t2.c1, t2.c2 where pk and fk match
SELECT t1.c1, t1.c2, t1.c3, t2.c1, t2.c2
FROM t1
INNER JOIN t2
ON t1.pk = t2.fk;

--Show a list of orders with customer names and order dates
SELECT Customers.*, Orders.*
FROM Customers
INNER JOIN Orders
ON Customers.CustomerID = Orders.CustomerID

--Get a list of products along with their suppliers
SELECT Products.ProductName, Suppliers.SupplierName
FROM Products
INNER JOIN Suppliers
ON Products.SupplierID = Suppliers.SupplierID

--Get a list of products along with their categories
SELECT Products.ProductName, Products.Price, Categories.CategoryName, Categories.Description
FROM Products
INNER JOIN Categories
ON Products.CategoryID = Categories.CategoryID

--Retrieve a list of orders with shipper information
SELECT Orders.OrderID, Shippers.*, Orders.OrderDate
FROM Orders
INNER JOIN Shippers
ON Orders.ShipperID = Shippers.ShipperID

-- SIMPLE INNER JOIN SYNTAX
SELECT table1.column_name, table2.column_name
FROM table1
INNER JOIN table2
ON table1.somethingID = table2.somethingID
