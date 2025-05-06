//imports the id number associated with the patient the student has selected variable created on patients page
// as well as importing username variable created on sign in page
let patientval = parseInt(sessionStorage.getItem("patientval"));
console.log("patientval: " + patientval);
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

let total = document.getElementById('total');
let extensive = document.getElementById('extensive');
let limited = document.getElementById('limited');
let supervision = document.getElementById('supervision');
let independent = document.getElementById('independent');
let none1 = document.getElementById('none');

let hoyer = document.getElementById('hoyer');
let twoPerson = document.getElementById('two person');
let onePerson = document.getElementById('one person');
let setup = document.getElementById('setup');
let noSetup = document.getElementById('no setup');
let none2 = document.getElementById('no');

let left = document.getElementById('left');
let right = document.getElementById('right');
let supine = document.getElementById('supine');


//logs the self portion of the page
total.onclick = function(){sendData("bed_mobility_self", 1)};
extensive.onclick = function(){sendData("bed_mobility_self", 2)};
limited.onclick = function(){sendData("bed_mobility_self", 3)};
supervision.onclick = function(){sendData("bed_mobility_self", 4)};
independent.onclick = function(){sendData("bed_mobility_self", 5)};
none1.onclick = function(){sendData("bed_mobility_self", 6)};

//logs support portion of the page
hoyer.onclick = function(){sendData("bed_mobility_support", 1)};
twoPerson.onclick = function(){sendData("bed_mobility_support", 2)};
onePerson.onclick = function(){sendData("bed_mobility_support", 3)};
setup.onclick = function(){sendData("bed_mobility_support", 4)};
noSetup.onclick = function(){sendData("bed_mobility_support", 5)};
none2.onclick = function(){sendData("bed_mobility_support", 6)};

//logs position portion of the page
left.onclick = function(){sendData("bed_mobility_position", 1)};
right.onclick = function(){sendData("bed_mobility_position", 2)};
supine.onclick = function(){sendData("bed_mobility_position", 3)};
