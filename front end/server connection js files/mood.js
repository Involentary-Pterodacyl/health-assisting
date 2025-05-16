//imports the id number associated with the patient the student has selected variable created on patients page
// as well as importing username variable created on sign in page
let patientval = parseInt(sessionStorage.getItem("patientval"));
let username = sessionStorage.getItem("username");

let logout = document.getElementById("signout");

// once the page has fully loaded a call is made to the server with the username variable
// to check if the student has signed in
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

// marks the student as logged out in the server and reroutes them to the sign in page
if (logout !== null) {
  logout.onclick = function () {
    console.log("logging out");

    axios.post("http://localhost:3000/logout", {username:username})
      .catch(error => {
        console.error('Error:', error);
      });
    window.location.href = "../index.html";
  };
}

// function allows sending the numerical values assigned to each input to the server using the name of the destination table, current students username
// and the id number for the patient the student selected
function sendData(tableName, value) {
  axios.post('http://localhost:3000/submit', {tableName: tableName, username: username,  value: value, patientId: patientval})
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

// logs information from page
calm.onclick = function(){sendData("mood",1)};
happy.onclick = function(){sendData("mood", 2)};
depressed.onclick = function(){sendData("mood", 3)};
agitation.onclick = function(){sendData("mood", 4)};
sad.onclick = function(){sendData("mood", 5)};
yelling.onclick = function(){sendData("mood", 6)};
anxiety.onclick = function(){sendData("mood", 7)};
withdrawn.onclick = function(){sendData("mood", 8)};
combatitive.onclick = function(){sendData("mood", 9)};
