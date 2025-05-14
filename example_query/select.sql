-- Returns data in ALL columns from 'Customers' table.
SELECT * FROM Customers;

-- Returns data in 'CustomerID' column from 'Customers' table.
SELECT CustomerID FROM Customers;

-- Returns Number of rows in 'CustomerID' column from 'Customers' table.
SELECT COUNT(CustomerID) FROM Customers;

-- Returns data in 'CustomerID' and FirstName columns from 'Customers' table.
-- Only rows where FirstName is equal to 'John'
SELECT CustomerID, FirstName FROM Customers WHERE FirstName='John';