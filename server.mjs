import express from "express";
var mysql = require('mysql2');

let con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Ipk@mom925"//,
    // database: "helthassisting"
});


const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to my server!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});