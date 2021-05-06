const express = require('express');
const app = express()
const mysql = require("mysql");

//login cridentials
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'todo_list',
});

// res: response on the front end
// req: used to get information from the front end
app.get('/', (req, res) =>{
    const sqlInsert = "INSERT INTO todo_list (text, date, complete) VALUES ? (Go to the gym, 4/2/2021 @4:30:32, TRUE)"
    db.query(sqlInsert, (err, result) => {
        res.send('hello world');
    })
});

app.listen(3001, () => {
    console.log('running on port 3001');
});

