import {username} from "./login.js";

let weight = document.getElementById("weight");
let bp = document.getElementById("bp");
let temp = document.getElementById("temp");
let pulse = document.getElementById("pulse");
let respratory = document.getElementById("respratory");

let submit = document.getElementById("submit");

window.onload = () => {
  axios.post('http://localhost:3000/login_get', {username:username})
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

submit.onclick = () => {
  
}
