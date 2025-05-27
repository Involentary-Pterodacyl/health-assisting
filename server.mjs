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


let db_info = {host: '127.0.0.1', user: 'db_user', password: 'HA-db', database: 'health_assisting'};
const conn = mariadb.createConnection(db_info);

//getting data
app.post('/login', (req, res) => {
    console.log("in /login");
    conn.query("SELECT * FROM users where username='" + req.body.username + "'", (err, rows) => {
        console.log(err);
        console.log("in query");
        console.log(rows);
        if (rows.length > 0) {
            // username = rows[0]["username"];
            // isAdmin = Boolean(rows[0]["is_administrator"]);
            conn.query("update users set logged_in=1 where username='" + req.body.username + "'", (err,rows) => {});
            console.log("logged in");
            return res.send({user: true, admin: rows[0]["is_administrator"]});
        }
        else {
            console.log("Invalid username."); // this should be displayed to the user somehow
            return res.send({user: false});
        }
    });
});

app.post('/login_get', (req, res) => {
    console.log("checking if logged in");
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
    console.log("in /logout");
    //are we using this anymore?
    conn.query("update users set logged_in=0 where username='" + req.body.username + "'", (err) => {
        //console.log(err);
        console.log("tried to log out");
    });
});

app.get('/getPatients', (req, res) => {
    console.log("getPatients");
    conn.query("SELECT * FROM patients", (err, rows) => {
        console.log(rows);
        res.send(rows);
    })
        //console.log(err);
});

app.post('/signup', (req, res) => {
    console.log("creating account");
    conn.query("INSERT INTO users (is_administrator, first_name, last_name, username) values (" +
        req.body.admin + ", '" + req.body.firstName + "', '" + req.body.lastName + "', '" + req.body.username + "')", (err, rows) => {
        console.log("signup error: " + err);
    })
    conn.query("update users set logged_in=1 where username='" + req.body.username + "'", (err,rows) => {
        res.send(err);
    });
});

// Handle POST requests
app.post('/submit', (req, res) => {
    console.log("in submit");
    console.log("username: " + req.body.username);
    console.log("patientId: " + req.body.patientId);
    console.log("value: " + req.body.value);

    conn.query("insert into " + req.body.tableName + " (username, patient_id, value) values('"
        + req.body.username + "', " + req.body.patientId + ", " + req.body.value
        + ")", (err) => {
        console.log("err: " + err);
        console.log("submitted " + req.body.tableName);
    });
});

app.post('/teacher', (req, res) => {
    console.log(typeof(req.body.date1));
    console.log(req.body.date1);

        conn.query("SELECT * FROM " + req.body.tableName + " WHERE username = '" + req.body.username + "' AND DATE(date) >= '" + req.body.date1 + "' AND DATE(date) <= '" + req.body.date2 + "'", (err, rows) => {
            console.log("err (teacher): " + err);
            console.log(req.body.tableName + " : " + rows);
            console.log(rows);
            res.send(rows);
    })
})

app.post('/getStudents', (req, res) => {
    conn.query("SELECT * FROM users WHERE is_administrator = 0 order by last_name", (err, rows) => {
        console.log("err (getStudents): " + err);
        res.send(rows);
    })
})

app.post('/twoValues', (req, res) => {
    console.log("in submit");
    console.log("username: " + req.body.username);
    console.log("patientId: " + req.body.patientId);
    console.log("value one: " + req.body.val1);
    console.log("value two: " + req.body.val2);
    console.log("table sections: " + req.body.colName1 + ", " + req.body.colName2)

    conn.query("insert into " + req.body.tableName + " (username, patient_id, " + req.body.colName1 + ", " + req.body.colName2 +") values('"
        + req.body.username + "', " + req.body.patientId + ", " + req.body.val1 + ", " + req.body.val2
        + ")", (err) => {
        console.log("err: " + err);
        console.log("submitted " + req.body.tableName);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});