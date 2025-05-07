//imports the id number associated with the patient the student has selected variable created on patients page
// as well as importing username variable created on sign in page

let patientval = sessionStorage.getItem("patientval");
let username = sessionStorage.getItem("username");

let logout = document.getElementById("signout");
let submit = document.getElementById("submit");

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

let bath1 = document.getElementById("bmu1");
let bath2 = document.getElementById("bmu2");
let bath3 = document.getElementById("bmu3");
let bath4 = document.getElementById("bmu4");

let assistA = document.getElementById("A1");
let assistI = document.getElementById("I1");
let assistD = document.getElementById("D1");

let shaveA = document.getElementById("A2");
let shaveI = document.getElementById("I2");
let shaveD = document.getElementById("D2");
let shaveN = document.getElementById("N2");

let rubA = document.getElementById("A3");
let rubI = document.getElementById("I3");
let rubD = document.getElementById("D3");

let nailA = document.getElementById("A4");
let nailI = document.getElementById("I4");
let nailD = document.getElementById("D4");

let oralA = document.getElementById("A5");
let oralI = document.getElementById("I5");
let oralD = document.getElementById("D5");

let dentureA = document.getElementById("A6");
let dentureI = document.getElementById("I6");
let dentureD = document.getElementById("D6");
let dentureN = document.getElementById("N6");

sumit.on("click", function(){
  let bath;
  let assist;
  let shave;
  let rub;
  let nail;
  let oral;
  let denture;

  if(bath1.checked) {bath = 1}
  else if(bath2.checked) {bath = 2}
  else if(bath3.checked) {bath = 3}
  else if(bath4.checked) {bath = 4}

  if(assistA.checked) {assist = 1}
  else if(assistI.checked) {assist = 2}
  else if(assistD.checked) {assist = 3}

  if(shaveA.checked) {shave = 1}
  else if(shaveI.checked) {shave = 2}
  else if(shaveD.checked) {shave = 3}


})


