-- 1. Calculate the total sales amount for all products.
-- Show Sales and Details
SELECT Products.ProductName AS Product,
Products.Price AS Price,
OrderDetails.Quantity AS [Number Sold],
(Price * [Number Sold]) AS Sale
FROM OrderDetails
INNER JOIN Products
ON OrderDetails.ProductID = Products.ProductID;
-- Shows only a Column of Sales
SELECT
Products.Price * OrderDetails.Quantity AS Sale
FROM OrderDetails
INNER JOIN Products
ON OrderDetails.ProductID = Products.ProductID;
-- Shows Total Sale Value
SELECT SUM(OrderDetails.Quantity * Products.Price) AS [Total Sales Ammount]
FROM OrderDetails
INNER JOIN Products
ON OrderDetails.ProductID = Products.ProductID;
-- The answer is 386,424.23


-- 2. Find the average birth year of all employees.
-- Show just years from birthdates
SELECT YEAR(Birthdate) AS birthYear
From Employees;
-- Show Average Birth Year
SELECT AVG(YEAR(BirthDate)) AS [Average Birth Year]
FROM Employees;
-- Answer 1957.4

-- 3. Identify the highest quantity order that has happened.
SELECT MAX(Quantity) AS [Highest Quantity Order]
FROM OrderDetails;


-- 4. Calculate the total amount of products sold.
SELECT SUM(Quantity) AS [Total Product Sold]
FROM OrderDetails;

-- 5. Find the average product price for all products.
SELECT AVG(Price) AS [Average Product Price]
FROM Products;

-- 6. Determine the minimum quantity of an order that has been placed.
SELECT MIN(Quantity) AS [Smallest Quantity Ordered]
FROM OrderDetails;

-- 7. Identify the maximum order date placed by all customers.
-- Show last order from all customers
SELECT MAX(OrderDate) AS [Most Recent Order]
From Orders;
-- Show last order for each customer
SELECT CustomerID, MAX(OrderDate) AS [Most Recent Order]
FROM Orders
GROUP BY CustomerID;

-- 8. Find the average price of all the products that have a name starting with the letter L.
SELECT ProductName, Price
FROM Products
WHERE ProductName LIKE 'L%'

SELECT ProductName, AVG(Price) AS [Average Price]
FROM Products
WHERE ProductName LIKE 'L%'
GROUP BY ProductName

SELECT AVG(Price) AS [Average Price]
FROM Products
WHERE ProductName LIKE 'L%';