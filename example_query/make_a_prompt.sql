
-- MY PROMPTS & SOLUTIONS (RIVERS GOT THEM ALL CORRECT)
-- Show the Postal Codes and names of Cities in Germany.
-- Exclude Berlin, and sort results by City (alpphabetically)
SELECT PostalCode, City FROM Customers
WHERE Country = 'Germany' AND City != 'Berlin'
ORDER BY City ASC;

-- Count the number of customers in Mexico
SELECT Count(CustomerID) FROM CUSTOMERS
WHERE Country = "Mexico"

-- Show Customer Names that start with 'B' and their Country.
-- Only if they are in France, UK or Sweden.
SELECT CustomerName, Country FROM Customers
WHERE Country IN('France', 'UK', 'Sweden') AND CustomerName LIKE 'B%';


--RIVERS PROMPTS / MY SOLUTIONS (I GOT THEM ALL CORRECT)

--1. Find all the information of people in customers which postal codes include a dash
-- sort by customer names a to z
SELECT * FROM Customers
WHERE PostalCode LIKE '%-%'
ORDER BY CustomerName ASC;

--2. get ammount of patients that live in Hamilton, Burlington, and Toronto
SELECT Count(patient_id) FROM patients
WHERE city IN('Hamilton', 'Burlington', 'Toronto');

--3. Find order detail, order id, and product id for order details where 
--quantity is less than or equal to 50.
--look for products with ids 10-16 and order by most to least quantity.
SELECT OrderDetailID, OrderID, ProductID FROM OrderDetails
WHERE Quantity <= 50 AND ProductID BETWEEN 10 AND 16
ORDER BY Quantity DESC;
