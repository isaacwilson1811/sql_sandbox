const sqlite3 = require('sqlite3').verbose()
const fs = require('fs')
const dbPath = 'w3schools.db'
const sqlFilePath = 'w3schools.sql'

// Drop all tables before restoring data
function dropAllTables(callback) {
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
            return callback(err);
        }
        console.log('Opening default db...');

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
            console.log('Dropping existing tables...')
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


// Restore the database from an SQL file
function restoreDatabase(callback) {
    // First, drop all tables to reset the database
    dropAllTables((err) => {
        if (err) {
            return callback(err);  // Exit if the dropping fails
        }

        // Create a new database
        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Error creating database:', err.message);
                return callback(err);
            }
            console.log('New database created.');

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
                // //db close
                // db.close((err) => {
                //     if (err) {
                //         console.error(err)
                //     }
                // })

            });
        });
    });
}


module.exports = {
    restoreDatabase
};
