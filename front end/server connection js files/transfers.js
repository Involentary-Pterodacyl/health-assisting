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

let dependent = document.getElementById("dependent");
let extAssist = document.getElementById("extAssist");
let limAssist = document.getElementById("limAssist");
let supervision = document.getElementById("supervision");
let independent = document.getElementById("independent");
let none1 = document.getElementById("none");

let hoyer = document.getElementById('hoyer');
let twoPerson = document.getElementById("twoPerson");
let onePerson = document.getElementById("onePerson");
let setup = document.getElementById("setup");
let noSetup = document.getElementById("noSetup");
let none2 = document.getElementById("no");

let cane = document.getElementById("cane");
let walker = document.getElementById("walk");
let crutches = document.getElementById("crutch");
let wheelchair = document.getElementById("wheel");
let bedridden = document.getElementById("bedrid");
let none3 = document.getElementById("nodevice");


dependent.onclick = function(){sendData("transfers_self", 1, patientval)};
extAssist.onclick = function(){sendData("transfers_self", 2, patientval)};
limAssist.onclick = function(){sendData("transfers_self", 3, patientval)};
supervision.onclick = function(){sendData("transfers_self", 4, patientval)};
independent.onclick = function(){sendData("transfers_self", 5, patientval)};
none1.onclick = function(){sendData("transfers_self", 6, patientval)};

hoyer.onclick = function(){sendData("transfers_support", 1, patientval)};
twoPerson.onclick = function(){sendData("transfers_support", 2, patientval)};
onePerson.onclick = function(){sendData("transfers_support", 3, patientval)};
setup.onclick = function(){sendData("transfers_support", 4, patientval)};
noSetup.onclick = function(){sendData("transfers_support", 5, patientval)};
none2.onclick = function(){sendData("transfers_support", 6, patientval)};

cane.onclick = function(){sendData("transfers_device", 1, patientval)};
walker.onclick = function(){sendData("transfers_device", 2, patientval)};
crutches.onclick = function(){sendData("transfers_device", 3, patientval)};
wheelchair.onclick = function(){sendData("transfers_device", 4, patientval)};
bedridden.onclick = function(){sendData("transfers_device", 5, patientval)};
none3.onclick = function(){sendData("transfers_device", 6, patientval)};
