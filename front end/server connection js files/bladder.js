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

let continent = document.getElementById("continent");
let incontinent = document.getElementById("incontinent");
let catheter = document.getElementById("catheter");
let catheterL = document.getElementById("catheterL");
let bathroom = document.getElementById("bathroom");
let bedPan = document.getElementById("bedPan");
let besideCommode = document.getElementById("besideCommode");
let pads = document.getElementById("pads");

// logs information from page
continent.onclick = function(){sendData("bladder", 1, patientval)};
incontinent.onclick = function(){sendData("bladder", 2, patientval)};
catheter.onclick = function(){sendData("bladder", 3, patientval)};
catheterL.onclick = function(){sendData("bladder", 4, patientval)};
bathroom.onclick = function(){sendData("bladder", 5, patientval)};
bedPan.onclick = function(){sendData("bladder", 6, patientval)};
besideCommode.onclick = function(){sendData("bladder", 7, patientval)};
pads.onclick = function(){sendData("bladder", 8, patientval)};
