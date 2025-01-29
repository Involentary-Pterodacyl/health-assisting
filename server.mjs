import express from "express";
import mysql from "mysql2";
import cors from "cors";
import res from "express/lib/response.js";
import http from "http";
const app = express();


// let con = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "Ipk@mom925"//,
//     // database: "helthassisting"
// });

app.use(cors());

const options = {
    origin: 'http://localhost:63342',
}
app.use(cors(options))

const port = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to my server!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function getData() {
    var str = '';

    var options = {
        host: 'http://localhost:3000',
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
            res.send(req.data);
            res.send(str);
        });
    }

    var req = http.request(options, callback).end();
}
getData();