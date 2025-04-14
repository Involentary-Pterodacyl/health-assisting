import {patientval} from "./patients.js";
import {getUsername} from "./login.js";

window.onload = () => {
  axios.post('http://localhost:3000/login_get', {username:getUsername()})
    .then(response => {
      console.log(response.data);
      if (response.data === false){
        console.log("not signed in");
        window.location.href = "../index.html";
      }
    });
}

function sendData(tableName, value, patientNum) {
  axios.post('http://localhost:3000/submit', {tableName: tableName, username: username,  value: value, patientId: patientNum})
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

let total = document.getElementById('total');
let extensive = document.getElementById('extensive');
let limited = document.getElementById('limited');
let supervision = document.getElementById('supervision');
let independent = document.getElementById('independent');
let none1 = document.getElementById('none');

let twoPerson = document.getElementById('two person');
let onePerson = document.getElementById('one person');
let setup = document.getElementById('setup');
let noSetup = document.getElementById('no setup');
let none2 = document.getElementById('no');


total.onclick = function(){sendData("bed_mobility_support", 1, patientval)};
extensive.onclick = function(){sendData("bed_mobility_support", 2, patientval)};
limited.onclick = function(){sendData("bed_mobility_support", 3, patientval)};
supervision.onclick = function(){sendData("bed_mobility_support", 4, patientval)};
independent.onclick = function(){sendData("bed_mobility_support", 5, patientval)};
none1.onclick = function(){sendData("bed_mobility_support", 6, patientval)};


twoPerson.onclick = function(){sendData("bed_mobility_self", 1, patientval)};
onePerson.onclick = function(){sendData("bed_mobility_self", 2, patientval)};
setup.onclick = function(){sendData("bed_mobility_self", 3, patientval)};
noSetup.onclick = function(){sendData("bed_mobility_self", 4, patientval)};
none2.onclick = function(){sendData("bed_mobility_self", 5, patientval)};
