let patientval = parseInt(sessionStorage.getItem("patientval"));
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
  location.reload();
}

let calm = document.getElementById("calm");
let happy = document.getElementById("happy");
let depressed = document.getElementById("depressed");
let agitation = document.getElementById("agitation");
let sad = document.getElementById("sad");
let yelling = document.getElementById("yelling");
let anxiety = document.getElementById("anxiety");
let withdrawn = document.getElementById("withdrawn");
let combatitive = document.getElementById("combatitive");


calm.onclick = function(){sendData("mood",1, patientval)};
happy.onclick = function(){sendData("mood", 2, patientval)};
depressed.onclick = function(){sendData("mood", 3, patientval)};
agitation.onclick = function(){sendData("mood", 4, patientval)};
sad.onclick = function(){sendData("mood", 5, patientval)};
yelling.onclick = function(){sendData("mood", 6, patientval)};
anxiety.onclick = function(){sendData("mood", 7, patientval)};
withdrawn.onclick = function(){sendData("mood", 8, patientval)};
combatitive.onclick = function(){sendData("mood", 9, patientval)};
