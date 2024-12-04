var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Ipk@mom925"//,
    // database: "helthassisting"
});

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

let date1 = document.getElementById("date1").value;
let date2 = document.getElementById("date2").value;
let date3 = document.getElementById("date3").value;
let date4 = document.getElementById("date4").value;
let date5 = document.getElementById("date5").value;
let date6 = document.getElementById("date6").value;
let date7 = document.getElementById("date7").value;

let patAbil1 = document.getElementById("patAbil1").value;
let patAbil2 = document.getElementById("patAbil2").value;
let patAbil3 = document.getElementById("patAbil3").value;
let patAbil4 = document.getElementById("patAbil4").value;
let patAbil5 = document.getElementById("patAbil5").value;
let patAbil6 = document.getElementById("patAbil6").value;
let patAbil7 = document.getElementById("patAbil7").value;

let method1 = document.getElementById("method1").value;
let method2 = document.getElementById("method2").value;
let method3 = document.getElementById("method3").value;
let method4 = document.getElementById("method4").value;
let method5 = document.getElementById("method5").value;
let method6 = document.getElementById("method6").value;
let method7 = document.getElementById("method7").value;


con.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE BLADDERroot SET date = " + date1 + " WHERE date = '00/00/10'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
    });
});