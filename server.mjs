import express from "express";
import cors from "cors";
import mariadb from "mariadb/callback.js";

let pool = mariadb.createPool({
    host: "localhost",
    user: "db_user",
    password: "HA-db",
    database: "health_assisting",
    connectionLimit: 5
});

const app = express();

app.use(cors());

const corsOrigin = {
    origin: 'http://localhost:63342',
}
app.use(cors(corsOrigin));

const port = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to my server!');
});

// Middleware to parse JSON and form data
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data

let isUser;
//getting data
app.post('/login', (req, res) => {

    const conn = mariadb.createConnection({host: '127.0.0.1', user: 'db_user', password: 'HA-db', database: 'health_assisting'});
    conn.query("SELECT username FROM users where username='" + req.body.username + "'", (err, rows) => {
        console.log(rows);
        if (rows.length > 0) {
            console.log(rows[0]["username"]); //the actual value as a string
        }
        else {
            console.log("Invalid username.");
        }
        conn.end();
    })
});

// Handle POST requests
app.post('/submit', (req, res) => {
    console.log('Received POST Data:', req.body); // Access the POST data
    res.json({ message: 'Data received', data: req.body });

    /*
    async function asyncFunction() {
  let conn;
  try {
	conn = await pool.getConnection();
	const rows = await conn.query("SELECT 1 as val");
	console.log(rows); //[ {val: 1}, meta: ... ]
	const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
	console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

  } catch (err) {
	throw err;
  } finally {
	if (conn) conn.end();
  }
}
asyncFunction().then(() => {
  pool.end();
});
     */
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});