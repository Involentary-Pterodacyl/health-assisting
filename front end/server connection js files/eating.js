//imports the id number associated with the patient the student has selected variable created on patients page
// as well as importing username variable created on sign in page
let patientval = sessionStorage.getItem("patientval");
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

let dependent = document.getElementById("dependent");
let extAssist = document.getElementById("extAssist");
let limAssist = document.getElementById("limAssist");
let supervision = document.getElementById("supervision");
let independent = document.getElementById("independent");
let none1 = document.getElementById("none");

let feedTube = document.getElementById("feedtube");
let twoPerson = document.getElementById("twoPerson");
let onePerson = document.getElementById("onePerson");
let setup = document.getElementById("setup");
let noSetup = document.getElementById("noSetup");
let none2 = document.getElementById("no");

//logs the self portion of the page
dependent.onclick = function(){sendData("eating_self", 1)};
extAssist.onclick = function(){sendData("eating_self", 2)};
limAssist.onclick = function(){sendData("eating_self", 3)};
supervision.onclick = function(){sendData("eating_self", 4)};
independent.onclick = function(){sendData("eating_self", 5)};
none1.onclick = function(){sendData("eating_self", 6)};

//logs support portion of the page
feedTube.onclick = function(){sendData("eating_support", 1)};
twoPerson.onclick = function(){sendData("eating_support", 2)};
onePerson.onclick = function(){sendData("eating_support", 3)};
setup.onclick = function(){sendData("eating_support", 4)};
noSetup.onclick = function(){sendData("eating_support", 5)};
none2.onclick = function(){sendData("eating_support", 6)};
