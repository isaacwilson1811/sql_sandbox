// Import sqlite3 module
const sqlite3 = require('sqlite3').verbose();

// Open in memory database connection
const db = new sqlite3.Database('w3schools.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

function getTables(callback) {
    let tableList = [];
    db.all("SELECT * FROM sqlite_master WHERE type='table'", (err, tables) => {
        if (err) {
            return callback(err);
        }
        let promises = tables.map((table) => {
            return new Promise((resolve, reject) => {
                db.all(`SELECT COUNT(*) AS records FROM ${table.name}`, (err, obj) => {
                    if (err) {
                        reject(err);
                    } else {
                        tableList.push({ 'name': table.name, 'records': obj[0].records });
                        resolve();
                    }
                });
            });
        });
        Promise.all(promises)
            .then(() => {
                callback(null, tableList);
            })
            .catch((err) => {
                callback(err);
            });
    });
};


// Function to execute a custom SQL query
function execQuery(query, callback) {
    // For SELECT queries, we can return the result set
    if (query.trim().toUpperCase().startsWith('SELECT')) {
        db.all(query, (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(null, rows);  // Return rows for SELECT queries
        });
    } else {
        db.exec(query, (err) => {
            if (err) {
                return callback(err);
            }
            callback(null, 'Query executed successfully');
        });
    }
}


// Function to create a table if it doesn't exist
function createTable() {
    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER)");
    });
}

// Function to insert a user into the 'users' table
function insertUser(name, age, callback) {
    const stmt = db.prepare("INSERT INTO users (name, age) VALUES (?, ?)");
    stmt.run(name, age, function(err) {
        if (err) {
            console.error('Error inserting data:', err.message);
            callback(err, null);
        } else {
            console.log('User inserted with ID:', this.lastID);
            callback(null, this.lastID);
        }
    });
    stmt.finalize();
}

// Function to fetch all users
function getUsers(callback) {
    db.all("SELECT * FROM users", (err, rows) => {
        if (err) {
            console.error('Error querying database:', err.message);
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
}

// Function to close the database
function closeDatabase() {
    db.close((err) => {
        if (err) {
            console.error('Error closing the database:', err.message);
        } else {
            console.log('Closed the SQLite database.');
        }
    });
}

// Export the functions so they can be used in your Express app
module.exports = {
    createTable,
    insertUser,
    getUsers,
    closeDatabase,
    execQuery,
    getTables
};
