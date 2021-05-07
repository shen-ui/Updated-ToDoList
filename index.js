const express = require('express');
const app = express()
const mysql = require("mysql");

//login cridentials
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'todo_list',
    user: 'DADDYMUSK',
    password: '2020TSupra!'
});

// res: response on the front end
// req: used to get information from the front end
app.post("/api/insert", (req, res) => {
    const sqlInsert = "INSERT INTO todo_list.data (text, date, complete) VALUES ('finish this off', 1995-10-30 14:32:12, false);"
    //const sqlInsert = "INSERT INTO todo_list (text, date, complete) VALUES (?,?,?)"

    db.query(sqlInsert, [text, date, complete], (err, res) => {  
    })
});

app.listen(3333, () => {
    console.log('running on port 3306');
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