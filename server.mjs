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
//     password:
//     // database: "helthassisting"
// });

app.use(cors());

const corsOrigin = {
    origin: 'http://localhost:63342',
}
app.use(cors(corsOrigin))

const port = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to my server!');
});

// Middleware to parse JSON and form data
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data

// Handle POST requests
app.post('/submit', (req, res) => {
    console.log('Received POST Data:', req.body); // Access the POST data
    res.json({ message: 'Data received', data: req.body });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function getData() {
    const postData = JSON. stringify({
        'msg': 'Hello World!',
    });

    let str = '';

    const options = {
        host: 'http://localhost:3000',
        path: '/'
    };

    // let callback = function (response) {
    //
    //     response.on('data', function (chunk) {
    //         str += chunk;
    //     });
    //
    //     response.on('end', function () {
    //         console.log(req.data);
    //         console.log(str);
    //         // your code here if you want to use the results !
    //         res.send(req.data);
    //         res.send(str);
    //     });
    // }
    //let req = http.request(options, callback).end();

    const req = http. request(options, (res) => {
        console. log(`STATUS: ${res. statusCode}`);
        console. log(`HEADERS: ${JSON. stringify(res. headers)}`);
        res. setEncoding('utf8');
        res. on('data', (chunk) => {
            console. log(`BODY: ${chunk}`);
        });
        res. on('end', () => {
            console. log('No more data in response.');
        });
    });

    req. on('error', (e) => {
        console. error(`problem with request: ${e. message}`);
    });

// Write data to request body
    req. write(postData);
    req. end();
}
