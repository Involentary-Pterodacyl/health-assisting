// import axios from '../node_modules/axios';
import {patientval} from "./patients";

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

function sendData(tableName, value) {
  axios.post('http://localhost:3000/submit', {tableName: tableName, userId: id, patientId: patientval, value: value})
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
export {sendData};
