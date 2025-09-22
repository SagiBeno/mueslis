const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // TODO - credential!
    database: 'mueaslis'
})

app.get('/mueslis', (req, res) => {
    //conn.connect(err => console.warn('connect err ', err));
    //console.log('conn: ', conn);

    conn.query('SELECT id, name, price FROM mueslis', (err, result, fields) => {
        if (err) console.warn(err)
        if (result) {
            console.log(result)
            console.log(fields)

            res.status(200).json({err, result, fields})
        } else {
            res.status(403).json({err})
        }
    })
})

app.get((err, req, res) => {
    if (err) res.status(404).send("<h1>404 Not Found (Hello world :) )</h1>")
    else res.sendStatus(200)    
})

const port = 3333
app.listen(port, err => console.log("Node Express backend server start; port, err: ", port, err))