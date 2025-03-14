import express from "express";
import cors from "cors";
import mariadb from "mariadb/callback.js";

const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "HA-db",
    connectionLimit: 5
});

const app = express();

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

//getting data
app.post('/getId', (req, res) => {


    let conn
    let queryResult
    try {
        conn = mariadb.createConnection({
            host: "localhost",
            user: "db_user",
            password: "HA-db",
            database: "health_assisting"
        })
        queryResult = conn.query("SELECT user_id FROM users WHERE username = '" + req.body.username + "';",
            (err,res,meta) => {
            if (err) {
                console.error("Error querying data: ", err);
            } else {
                console.log(res);
            }
        });
        console.log('db query complete')
    }  catch (err) {
        console.log(err);
    } finally {
        console.log('type: ' + typeof queryResult);
        console.log(queryResult);
        if (conn)  conn.end();
        console.log('db connection closed');
    }
    return queryResult

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