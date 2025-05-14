-- Change the customers name Alfreds Futterkiste to be Alfy Kiste
UPDATE Customers SET CustomerName ='Alfy Kiste'
WHERE CustomerName = 'Alfreds Futterkiste';
-- Verify
SELECT CustomerName FROM Customers
WHERE CustomerName LIKE 'A%';

-- Rattlesnake Canyon Grocery's CustomerID is 65
SELECT CustomerID, CustomerName FROM customers
WHERE CustomerName LIKE 'Rattlesnake%';

-- Delete the order placed from Rattlesnake Canyon Grocery on 1/1/1997
DELETE FROM Orders
WHERE OrderDate = '1997-01-01' AND CustomerID = 65;

-- Delete all orders from 1997 on
DELETE FROM Orders
WHERE OrderDate >= '1997-01-01';

--Update the customer Around the Horn's full address to be MTech lehi's address
UPDATE Customers SET Address = '2301 Ashton Blvd', City = 'Lehi', PostalCode = '84043', Country = 'UT, USA'
WHERE CustomerName = 'Around the Horn';


-- ISAAC PROMPTS
-- Update the phone number for shipper 'Speedy Express' to '(555) 123-4567'
UPDATE Shippers SET Phone = '(555) 123-4567'
WHERE ShipperName = 'Speedy Express';
-- Delete all supplier records from Paris
DELETE FROM Suppliers
WHERE City = 'Paris';


-- RIVERS PROMPTS
-- Update contact name to be NULL if the city includes any white space
UPDATE Customers SET ContactName = NULL
WHERE City LIKE '% %';
-- Delete all rows which countries from customers that are not the USA
DELETE FROM Customers
WHERE Country != 'USA';