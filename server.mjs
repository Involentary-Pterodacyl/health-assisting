import express from "express";
import mysql from "mysql2"

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

function getData() {
    var http = require('http');
    var str = '';

    var options = {
        host: 'https//localhost3000',
        path: '/'
    };
    var callback = function (response) {

        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            console.log(req.data);
            console.log(str);
            // your code here if you want to use the results !
        });
    }

    var req = http.request(options, callback).end();
}