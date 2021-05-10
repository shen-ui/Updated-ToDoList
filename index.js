/**
 * backend code for the todo list.
 * 
 * Really one of the first few times I've used express with node 
 *                          so I will be commenting what I learn.
 * 
 * Ommitting sql comments because sql isn't particularly tedious.
 * 
 * app.get() => runs code on going into the given directory
 * app.post() => runs code upon a api post requested on the front end with a given directory
 * app.listen() => backend is accessable from the front end with a local host port.
 * 
 */

const express = require('express');
const app = express()
const mysql = require('mysql');
const cors = require('cors');

const corsOptions = {
    origin:'http://localhost:3000', 
    credentials:true, //access-control-allow-credentials:true
    optionSuccessStatus:200
}

//login cridentials
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'todo_list',
    user: 'DADDYMUSK',
    password: '2020TSupra!'
});
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/api/get', (req, res) =>{
    const sqlSelect = "SELECT * FROM data"
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

app.post("/api/insert", (req, res) => {
    const id = req.body.id;
    const text = req.body.text;
    const date = req.body.date;
    const complete = req.body.complete;
    const sqlInsert = "INSERT INTO data (id, text, date, complete) VALUES (?,?,?,?);"
    
    db.query(sqlInsert, [id, text, date, complete], (err, res) => {  
        if(err){
            console.log(err);
        }
        else{
            console.log(res);
        }
    })
});

app.listen(3333, () => {
    console.log('running on port 3333');
});

db.connect(function (err) {
    if(err){
        console.log("error occured while connecting");
    }
    else{
        console.log("connection created with Mysql successfully");
    }
 });

//--------------------TROUBLESHOOTING FUNCTIONS--------------------------------------
// Sends data to the front end of localhost
/*
app.get("/", (req, res) => {
    const sqlInsert = "INSERT INTO todo_list (text, date, complete) VALUES ('finish this off', 1995-10-30 14:32:12, false);"
    res.send(sqlInsert)
})

db.end((err) => {
    // The connection is terminated gracefully
    // Ensures all remaining queries are executed
    // Then sends a quit packet to the MySQL server.
 });

 app.get("/", (req, res) => {
    const sqlInsert = "INSERT INTO todo_list.data (text, date, complete) VALUES ('finish this off', '1995-10-30 14:32:12', 'false');"
    db.query(sqlInsert, (err, result) => {
        if(err){
            console.log("Problem sending data:" + err);
        }
        else{
            res.send("Hello World");
        }
    })
});
*/