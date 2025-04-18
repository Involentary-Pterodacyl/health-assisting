let patientval = sessionStorage.getItem("patientval");
let username = sessionStorage.getItem("username");

let logout = document.getElementById("signout");

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

let dependent = document.getElementById("dependent");
let extAssist = document.getElementById("extAssist");
let limAssist = document.getElementById("limAssist");
let supervision = document.getElementById("supervision");
let independent = document.getElementById("independent");
let none1 = document.getElementById("none");

let twoPerson = document.getElementById("twoPerson");
let onePerson = document.getElementById("onePerson");
let setup = document.getElementById("setup");
let noSetup = document.getElementById("noSetup");
let none2 = document.getElementById("no");



dependent.onclick = function(){sendData("transfers_support", 1, patientval)};
extAssist.onclick = function(){sendData("transfers_support", 2, patientval)};
limAssist.onclick = function(){sendData("transfers_support", 3, patientval)};
supervision.onclick = function(){sendData("transfers_support", 4, patientval)};
independent.onclick = function(){sendData("transfers_support", 5, patientval)};
none1.onclick = function(){sendData("transfers_support", 6, patientval)};


twoPerson.onclick = function(){sendData("transfers_self", 1, patientval)};
onePerson.onclick = function(){sendData("transfers_self", 2, patientval)};
setup.onclick = function(){sendData("transfers_self", 3, patientval)};
noSetup.onclick = function(){sendData("transfers_self", 4, patientval)};
none2.onclick = function(){sendData("transfers_self", 5, patientval)};
