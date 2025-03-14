// import axios from '../node_modules/axios';
//import {patientval} from "./patients.js";

let uname = document.getElementById("uname");
let psw = document.getElementById("psw");
let login = document.getElementById("login");

var username;
var password;
var id;

login.onclick = function (){
  password = psw.value
  username = uname.value

  axios.post("http://localhost:3000/getId", {username: username})
  .then(res => {
    console.log(res.data);
    id = res.data;
  })
  .catch(error => {
    console.error('Error:', error);
  })
};

function sendData(tableName, value, patientNum) {
  axios.post('http://localhost:3000/submit', {tableName: tableName, userId: id,  value: value, patientId: patientNum})
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function sendMealData(valueB, valueL, valueD, patientNum) {
  axios.post('http://localhost:3000/submitMeal', {tableName: "dietary_intake_meal", userId: id,  breakfast: valueB, lunch: valueL, dinner: valueD, patientId: patientNum})
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function sendInOutData(tableName, valueD, valueI, patientNum) {
  axios.post('http://localhost:3000/submitInOut', {tableName: tableName, userId: id,  ccIn: valueD, ccOut: valueI, patientId: patientNum})
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

export {sendData, sendMealData, sendInOutData};
