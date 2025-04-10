import {patientval} from "./patients.js";
import {username} from "./login.js";

window.onload = () => {
  axios.post('http://localhost:3000/login_get', {user:username})
    .then(response => {
      console.log(response.data);
      if (response.data === false){
        console.log("not signed in");
        window.location.href = "index.html";
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

let continent = document.getElementById("continent");
let incontinent = document.getElementById("incontinent");
let catheter = document.getElementById("catheter");
let catheterL = document.getElementById("catheterL");
let bathroom = document.getElementById("bathroom");
let bedPan = document.getElementById("bedPan");
let besideCommode = document.getElementById("besideCommode");
let pads = document.getElementById("pads");


continent.onclick = function(){sendData("bladder", 1, patientval)};
incontinent.onclick = function(){sendData("bladder", 2, patientval)};
catheter.onclick = function(){sendData("bladder", 3, patientval)};
catheterL.onclick = function(){sendData("bladder", 4, patientval)};
bathroom.onclick = function(){sendData("bladder", 5, patientval)};
bedPan.onclick = function(){sendData("bladder", 6, patientval)};
besideCommode.onclick = function(){sendData("bladder", 7, patientval)};
pads.onclick = function(){sendData("bladder", 8, patientval)};
