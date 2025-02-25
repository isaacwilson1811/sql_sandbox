const express = require('express')
const session = require('express-session')
const sqlite3 = require('sqlite3').verbose()

const app = express()
const port = 3000

app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: true
}))

app.use((req,res,next) =>{
    if (!req.session.db) {
        req.session.db = new sqlite3.Database(':memory:')
        console.log('Created new session db')
    }
    next()
})

//handle query
app.post ('/query', express.json(), (req,res) => {
    const query = req.body.query
    const db = req.session.db
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).sendStatus({ error: 'query failed'})
            return
        }
        res.json(rows)
    })
})

//close db when session ends
app.use((req,res,next) => {
    req.session.db.close((err) => {
        if (err) {
            console.error('Error closing DB', err)
        } else {
            console.log('Closed in memory db for session')
        }
    })
    next()
})

app.listen(port, () => {
    console.log('server runnning')
})
