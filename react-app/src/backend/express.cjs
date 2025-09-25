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
    database: 'mueslis'
})

app.get('/mueslis', (req, res) => {
    //conn.connect(err => console.warn('connect err ', err));
    //console.log('conn: ', conn);

    conn.query('SELECT id, name, price FROM muesli', (err, result, fields) => {
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

app.post('/mueslis', (req, res) => {
    const {name, price} = req.body // destruktúráló szintaxys
    if (!name || price < 1) res.sendStatus(300)
    
    conn.query("INSERT INTO muesli (name, price) VALUE (?, ?)", [name, price], (err, result, fields) =>{
        const insertId = result?.insertId
        console.log('isnertId', insertId)
        const responseBody = {id: +insertId, ...req.body}
        res.status(201).json(responseBody)
    })
})

app.patch('/mueslis', (req, res) => {
    const {id} = req.body
    const newName = 'name' in req.body ? req.body.name : null /* req.body.name ? req.body.name : null */
    const newPrice = +req.body.price>0 ? +req.body.price : NaN

    let queryStr = "UPDATE muesli SET " /* TODO HF querySrt megoldás */

    const updates = []
    const values = []

    if (newName) {
        updates.push("name=?")
        values.push(newName)
    }

    if (newPrice > 0) {
        updates.push("price=?")
        values.push(+newPrice)
    }

    values.push(+id)


    conn.query(`UPDATE muesli SET ${updates.join(",")} WHERE id=?`, 
        values, 
        (err, result, fields) => {
            console.log('Update result: ', result)
            if (err) res.status(300).json({err})
            else res.status(200).json({updatedId: id, newName, newPrice, ...result})
        }
    )
})

app.get((err, req, res) => {
    if (err) res.status(404).send("<h1>404 Not Found (Hello world :) )</h1>")
    else res.sendStatus(200)    
})

const port = 3333
app.listen(port, err => console.log("Node Express backend server start; port, err: ", port, err))