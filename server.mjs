import express from "express";
import cors from "cors";
import mariadb from "mariadb/callback.js";
import axios from "axios";

let username;
let isAdmin;
let patientId;


const app = express();

app.use(cors());

const corsOrigin = {
    origin: 'http://localhost:63343',
}
app.use(cors(corsOrigin));

const port = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to my server!');
});

// Middleware to parse JSON and form data
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data


let db_info = {host: '127.0.0.1', user: 'db_user', password: 'HA-db', database: 'health_assisting'}

//getting data
app.post('/login', (req, res) => {
    console.log("test");
    const conn = mariadb.createConnection(db_info);
    conn.query("SELECT * FROM users where username='" + req.body.username + "'", (err, rows) => {
        console.log(rows);
        if (rows.length > 0) {
            // username = rows[0]["username"];
            // isAdmin = Boolean(rows[0]["is_administrator"]);
            conn.query("update users set logged_in=1 where username='" + req.body.username + "'", (err,rows) => {});
            console.log("logged in");
            return res.send(true);
        }
        else {
            console.log("Invalid username."); // this should be displayed to the user somehow
            return res.send(false);
        }
    });
});

app.post('/login_get', (req, res) => {
    console.log("checking if logged in");
    const conn = mariadb.createConnection(db_info);
    conn.query("SELECT * FROM users where username='" + req.body.username + "'", (err, rows) => {
        console.log("username: " + req.body.username);
        console.log("rows:");
        console.log(rows);
        if(rows.length > 0)
        {
            console.log("logged in: " + rows[0]["logged_in"]);
            if (rows[0]["logged_in"] === 1)
            {
                console.log("logged in!");
                return res.send(true);
            }
            else {
                console.log("not logged in");
                return res.send(false);
            }
        }
        else {
            console.log("not logged in (invalid username)");
            return res.send(false);
        }
    });
});

//logout
app.post('/logout', (req, res) => {
    console.log("logout test");
    const conn = mariadb.createConnection(db_info);
    conn.query("update users set logged_in=0 where username='" + req.body.username + "'", (err) => {
        //console.log(err);
        console.log("tried to log out");
    });
});

app.post('/submitMeal', (req, res) => {
    console.log("sumbitMeal");
    const conn = mariadb.createConnection(db_info);
    conn.query("insert into meal (username, patient, breakfast, lunch, dinner) values("
        + req.body.username + ""
        + ")", (err) => {
        //console.log(err);
        console.log("submitted meal");
    });
});

//
// app.post('/signup', (req, res) => {
//     const conn = mariadb.createConnection(db_info);
//     conn.query("SELECT * FROM users where username='" + req.body.username + "'", (err, rows) => {
//         //console.log(rows);
//         if (rows.length > 0) {
//             console.log("That username is already taken."); // this should be displayed to the user somehow
//         }
//         else {
//             console.log("Good username");
//         }
//         conn.end();
//     })
//     //"INSERT INTO users (is_administrator, first_name, last_name, username) values (req.body.is_administrator, req.body.first_name, req.body.last_name, req.body.username)"
// });

// Handle POST requests
app.post('/submit', (req, res) => {
    console.log("in submit");
    console.log("username: " + req.body.username);
    console.log("patientId: " + req.body.patientId);
    console.log("value: " + req.body.value);
    const conn = mariadb.createConnection(db_info);
    conn.query("insert into " + req.body.tableName + " (username, patient_id, value) values('"
        + req.body.username + "', " + req.body.patientId + ", " + req.body.value
        + ")", (err) => {
        console.log("err: " + err);
        console.log("submitted " + req.body.tableName);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});