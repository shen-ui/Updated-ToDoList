/**
 * 
 * backend code for the todo list.
 * 
 * Really one of the first few times I've used express with node 
 *                          so I will be commenting what I learn.
 * 
 * Ommitting sql comments because sql isn't particularly tedious.
 * 
 * app.get() => runs code on going into the given directory
 * app.post() => runs code upon a api post requested on the front end with a given directory
 * app.delete() => handles delete request. Does NOT handle requests with body-parser. 
 *                 data must be taken as a parameter.
 * app.listen() => backend is accessable from the front end with a local host port.
 * 
 */

 const express = require('express');
 const mysql = require('mysql');
 const cors = require('cors');
 const fs = require('fs');
 const app = express();
 require('dotenv').config({path: './.env'});
 
 const corsOptions = {
     origin:'https://shen-ui.github.io/Updated-ToDoList/',
     credentials:true, //access-control-allow-credentials:true
     optionSuccessStatus:200
 }
 
 // sensative cridentals over .env
 let host = process.env.RDS_HOSTNAME;
 let port = process.env.RDS_PORT;
 let user = process.env.RDS_USERNAME;
 let password = process.env.RDS_PASSWORD;
 
 //print NON-SENSATIVE data
 console.log({
     host: host,
     port: port,
 })
 
 const db = mysql.createConnection({
     host: host,
     user: user,
     password: password,
     port: port,
 });
 
 // cors options
 app.use(cors(corsOptions));
 app.use(express.urlencoded({extended: true}));
 app.use(express.json());
 
 
 app.get('/', (req, res) => {
     res.send("Welcome to MySQL server!");
 })
 app.get('/api/get', (req, res) => {
     const sqlSelect =
         "SELECT * FROM todolist.data ORDER BY date DESC";
     db.query(sqlSelect, (err, result) => {
         res.send(result)
         console.log(result);
     })
     return;
 });
 app.delete('/api/delete/:id', (req, res) => {
     const id = req.params.id;
     const sqlDelete =
         "DELETE FROM todo_list.data WHERE id = ?";
     db.query(sqlDelete, id, (err, result) => {
         if(err){
             console.log(err)
         }
         else{
             console.log("row deleted: " + id)
         }
     })
     const sqlShift = "UPDATE todo_list.data SET id=id-1 WHERE id > ?"
     db.query(sqlShift,id, (req, res) => {
         console.log(res);
     });
 });
 app.post("/api/insert", (req, res) => {
     const id = req.body.id
     const text = req.body.text
     const date = req.body.date
     const complete = req.body.complete
     const sqlInsert = "INSERT INTO todo_list.data (id, text, date, complete) VALUES (?,?,?,?);"
 
     db.query(sqlInsert, [id, text, date, complete], (err, res) => {
         if(err){
             console.log(err)
         }
         else{
             console.log(res)
         }
     })
 });
 app.put("/api/update", (req, res) => {
     const id = req.body.id;
     const text = req.body.text;
     const date = req.body.date;
     console.log(req.body);
     const sqlUpdateText = "UPDATE todo_list.data SET text = ?, date = ?, complete=false WHERE id = ?";
     db.query(sqlUpdateText, [text, date, id], (err,res) => {
         if(err){
             throw(err)
         }
         else{
             console.log(res)
         }
     })
 });
 app.put("/api/complete", (req, res) => {
     const id = req.body.id
     const complete = req.body.complete;
     const sqlPut = "UPDATE todo_list.data SET complete = ? WHERE id = ?";
     db.query(sqlPut, [complete, id], (err, res) => {
         if(err){
             console.log("complete error: " + err)
         }
         else{
             console.log(res);
         }
     })
 }) 

// connect to RDS DB
db.connect(function (err) {
    if(err){
        console.log(err)
    }
    else{
        console.log("connection created with Mysql successfully")
    }
});

app.listen(3000, () => { console.log("listening on port 3000")});