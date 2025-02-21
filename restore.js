const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const dbPath = 'w3schools.db';


// Function to drop all tables in the database
function dropAllTables(callback) {
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
            return callback(err);
        }
        console.log('Database opened.');

        // Get all table names in the database
        db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
            if (err) {
                console.error('Error fetching tables:', err.message);
                return callback(err);
            }

            if (tables.length === 0) {
                console.log('No tables found in the database.');
                return callback(null);  // No tables to drop
            }

            // Drop each table
            let dropQueries = tables.map(table => `DROP TABLE IF EXISTS ${table.name}`).join('; ');

            // Execute the drop queries
            db.exec(dropQueries, (err) => {
                if (err) {
                    console.error('Error dropping tables:', err.message);
                    return callback(err);
                }
                console.log('All tables dropped.');
                callback(null);  // Successfully dropped all tables
            });
        });
    });
}


// Function to restore the database from an SQL file
function restoreDatabase(sqlFilePath, callback) {
    // First, drop all tables to reset the database
    dropAllTables((err) => {
        if (err) {
            return callback(err);  // Exit if the dropping fails
        }

        // Create a new SQLite database (already done since we kept the same db file)
        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Error creating database:', err.message);
                return callback(err);
            }
            console.log('New database created (or already exists).');

            // Read the SQL backup file to restore
            fs.readFile(sqlFilePath, 'utf8', (err, sql) => {
                if (err) {
                    console.error('Error reading SQL backup file:', err.message);
                    return callback(err);
                }

                // Execute the SQL commands to restore the database
                db.exec(sql, (err) => {
                    if (err) {
                        console.error('Error restoring database:', err.message);
                        return callback(err);
                    }
                    console.log('Database restored successfully.');
                    callback(null);
                });
            });
        });
    });
}


// Function to restore the database from an SQL file
// function restoreDatabase(sqlFilePath, callback) {
//     //first delete the database so it can be remade.
//     // Read the SQL file
//     fs.readFile(sqlFilePath, 'utf8', (err, sql) => {
//         if (err) {
//             return callback(err);
//         }

//         // Open a connection to the SQLite database
//         const db = new sqlite3.Database(dbPath, (err) => {
//             if (err) {
//                 return callback(err);
//             }
//             console.log('Connected to w3schools database');
//         });

//         // Run the SQL commands from the file
//         db.exec(sql, (err) => {
//             if (err) {
//                 return callback(err);
//             }

//             console.log('Database restored successfully');
//             db.close((err) => {
//                 if (err) {
//                     return callback(err);
//                 }
//                 console.log('Database connection closed');
//             });

//             callback(null, 'Database restored successfully');
//         });
//     });
// }



module.exports = {
    restoreDatabase
};
