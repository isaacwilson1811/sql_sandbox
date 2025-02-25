// Import sqlite3
const sqlite3 = require('sqlite3').verbose()
//Import express and sessions
const express = require('express')




// CREATE and RESTORE THE DB ON STARTUP
const defaultDb = require('./restore')
defaultDb.restoreDatabase((err, message) => {
    if (err) {
        console.error('Error restoring the database:', err.message)
    } else {
        console.log(message)
    }
})
const fs = require('fs')
const defaultDbPath = './w3schools.db'

//start express
const app = express()

// Use Sessions
app.use(session({
    secret: 'key1234',
    resave: false,
    saveUninitialized: true
}))
// Create In memory DB when user connects
// app.use((req,res,next) =>{
//     if (!req.session.db) {
//         req.session.db = new sqlite3.Database(':memory:')
//         console.log('Created new session db')
//     }
//     next()
// })

//create and attach default db
app.use((req,res,next) => {
    if (!req.session.db) {
        req.session.db = new sqlite3.Database(':memory:', (err) => {
            if (err) {
                console.log('Error: ', err)
                return
            }
            req.session.db.serialize(() => {
                req.session.db.run(
                    `ATTACH DATABASE ? AS w3schools`, [defaultDbPath], (err) => {
                        if (err) {
                            console.error('Error attaching DB', err)
                            return
                        }
                        req.session.db.each("SELECT name FROM w3schools.sqlite_master WHERE type='table'", (err, row) => {
                            if (err) {
                                console.error(err)
                                return
                            }
                            req.session.db.run(`CREATE TABLE IF NOT EXISTS ${row.name} AS SELECT * FROM w3schools.${row.name}`, (err) => {
                                if (err) {
                                    console.error(`Error copy table ${row.name}`, err)
                                }
                            })
                        })
                        //detach
                        req.session.db.run("DETACH DATABASE w3schools", (err) => {
                            if (err) {
                                console.error('error', err)
                            }
                        })
                    }
                )
            })
        })
    }
    next();
})


//close db when session ends
// app.use((req,res,next) => {
//     req.session.db.close((err) => {
//         if (err) {
//             console.error('Error closing DB', err)
//         } else {
//             console.log('Closed in memory db for session')
//         }
//     })
//     next()
// })

app.use(express.json())
// Serve GUI web page from the front_end DIR
app.use('/', express.static('front_end'))


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});