const express = require('express')
const app = express()
const mysql2 = require('mysql2')
const cors = require('cors')

const port = 8080

app.use(cors())
app.use(express.json())

const conn = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'react_crud'
})

// get employees
app.get('/api/employee', async (req, res) => {
    await conn.execute('SELECT * FROM employees', (err, result) => {
        if(err) {
            res.status(400).json({
                'status': 400,
                'message': err.message
            })
            return
        }

        res.status(200).json(result)
    })
})

// search employee
app.get('/api/employee/:keyword', (req, res) => {
    const keyword = req.query.keyword
    conn.execute('SELECT * FROM employees WHERE first_name LIKE ? OR first_name LIKE ? OR email LIKE ? OR address LIKE ?',
    ['%'+keyword+'%', '%'+keyword+'%', '%'+keyword+'%', '%'+keyword+'%'], (err, result) => {
    if(err) {
        res.status(400).json({
            'status': 400,
            'message': err.message
        })
    }

        res.status(200).json(result)

    })
})

// store
app.post('/api/employee', (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const address = req.body.address
    conn.execute('INSERT INTO employees (first_name, last_name, email, address) VALUES (?, ?, ?, ?)',
    [firstName, lastName, email, address],
    (err, result) => {
        if(err) {
            res.status(400).json({
                'status': 400,
                'message': err.message
            })
            return
        }
        res.status(201).json({
            'status': 201,
            'message': 'inserted!!'
        })
    })
})

// edit
app.get('/api/employee/edit/:id', (req, res) => {
    const id = req.params.id
    conn.execute('SELECT * FROM employees WHERE id = ?',
    [id],
    (err, result) => {
        if(err) {
            res.status(400).json({
                'status': 400,
                'message': err.message
            })
            return
        }

        res.status(200).json(result)
    })
})

// update
app.put('/api/employee/update/:id', (req, res) => {
    const id = req.params.id
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const address = req.body.address
    conn.execute('UPDATE employees SET first_name = ?, last_name = ?, email = ?, address = ? WHERE id = ?',
    [firstName, lastName, email, address, id],
    (err, result) => {
        if(err) {
            res.status(400).json({
                'status': 400,
                'message': err.message
            })
            return
        }
        res.status(200).json({
            'status': 200,
            'message': 'updated!!'
        })
    })
})

//delete
app.delete('/api/employee/:id', (req, res) => {
    const id = req.params.id
    conn.execute('DELETE FROM employees WHERE id = ?',
    [id],
    (err, result) => {
        if(err) {
            res.status(400).json({
                'status': 400,
                'message': err.message
            })
            return
        }
        res.status(200).json({
            'status': 200,
            'message': 'Deleted!!'
        })
    })
})


app.listen(port, () => {
    console.log(`get me link ${port}`)
})
