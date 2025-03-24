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

let isUser;
//getting data
app.post('/login', (req, res) => {

    // const pool = mariadb.createPool({
    //     host: 'localhost',
    //     user:'db_user',
    //     password: 'HA-db',
    //     database: "health-assisting",
    //     connectionLimit: 5
    // });
    async function main() {
        let conn;

        try {
            conn = await mariadb.createConnection({
                host: 'localhost',
                user:'db_user',
                password: 'HA-db',
                database: "health-assisting",
            });

            await print_contacts(conn);
        } catch (err) {
            // Manage Errors
            console.log(err);
        } finally {
            // Close Connection
            if (conn) conn.close();
        }
    }

// Print list of contacts
    function print_contacts(conn) {
        return new Promise(
            (resolve, reject) => {
                resolve(
                    conn
                        .queryStream("SELECT * FROM users WHERE username = '" + req.body.username + "';")
                        .on("error", (err) => {
                            console.error("Issue retrieving information", err);
                        })
                        .on("fields", (meta) => {
                            console.error("Field Metadata:", meta);
                        })
                        .on("data", (row) => {
                            console.log(`${row.first_name} ${row.last_name}`);
                        })
                )
            }
        );
    }

    main();
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