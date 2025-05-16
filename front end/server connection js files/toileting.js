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

let colostomy = document.getElementById("colostomy");
let twoPerson = document.getElementById("twoPerson");
let onePerson = document.getElementById("onePerson");
let setup = document.getElementById("setup");
let noSetup = document.getElementById("noSetup");
let none2 = document.getElementById("no");

let liquid = document.getElementById("1poo");
let soft = document.getElementById("2poo");
let formed = document.getElementById("3poo");
let constipated = document.getElementById("4poo");

let catheter = document.getElementById("cy");
let noCatheter = document.getElementById("cn");

//logs the self portion of the page
dependent.onclick = function(){sendData("toileting_self", 1)};
extAssist.onclick = function(){sendData("toileting_self", 2)};
limAssist.onclick = function(){sendData("toileting_self", 3)};
supervision.onclick = function(){sendData("toileting_self", 4)};
independent.onclick = function(){sendData("toileting_self", 5)};
none1.onclick = function(){sendData("toileting_self", 6)};

//logs support portion of the page
colostomy.onclick = function(){sendData("toileting_support", 1)};
twoPerson.onclick = function(){sendData("toileting_support", 2)};
onePerson.onclick = function(){sendData("toileting_support", 3)};
setup.onclick = function(){sendData("toileting_support", 4)};
noSetup.onclick = function(){sendData("toileting_support", 5)};
none2.onclick = function(){sendData("toileting_support", 6)};

//logs consistency portion of the page
liquid.onclick = function(){sendData("toileting_consistency", 1)};
soft.onclick = function(){sendData("toileting_consistency", 2)};
formed.onclick = function(){sendData("toileting_consistency", 3)};
constipated.onclick = function(){sendData("toileting_consistency", 4)};

//logs catheter portion of the page
catheter.onclick = function(){sendData("catheter", 1)};
noCatheter.onclick = function(){sendData("catheter", 0)};
