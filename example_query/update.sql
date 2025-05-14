-- modify a value
UPDATE employees SET salary ='$6000'
WHERE employee_d = '100';

-- delete a row / record
DELETE FROM customers
WHERE last_purchase_date < '2022-1-01';