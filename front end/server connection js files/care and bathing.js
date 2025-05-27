//imports the id number associated with the patient the student has selected variable created on patients page
// as well as importing username variable created on sign in page

let patientval = sessionStorage.getItem("patientval");
let username = sessionStorage.getItem("username");

let logout = document.getElementById("signout"); // this signout button not working
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

// function allows sending the numerical values assigned to each input to the server using the name of the destination table, current students username
// and the id number for the patient the student selected. this one has been modified to send multiple values
//                                                                                          bathing       assist
function sendTwoValues(tableName, value1, value2, colName1, colName2) {
  axios.post('http://localhost:3000/twoValues', {tableName: tableName, username: username,  val1: value1, val2: value2,
    patientId: patientval, colName1: colName1, colName2: colName2})
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

// this once the submit button has been pressed checks what has been selected prompts user to make all selections
// if one or more is empty and sends the numerical data to the server
submit.onclick = function(){
  let method = 0;
  let assist = 0;
  let shave = 0;
  let rub = 0;
  let nails = 0;
  let oral = 0;
  let denture = 0;

  if (bath1.checked) {method = 1}
  else if(bath2.checked) {method = 2}
  else if(bath3.checked) {method = 3}
  else if(bath4.checked) {method = 4}

  if (assistA.checked) {assist = 1}
  else if(assistI.checked) {assist = 2}
  else if(assistD.checked) {assist = 3}

  if (shaveA.checked) {shave = 1}
  else if(shaveI.checked) {shave = 2}
  else if(shaveD.checked) {shave = 3}
  else if (shaveN.checked) {shave = 4}

  if (rubA.checked) {rub = 1}
  else if (rubI.checked) {rub = 2}
  else if (rubD.checked) {rub = 3}

  if (nailA.checked) {nails = 1}
  else if(nailI.checked) {nails = 2}
  else if(nailD.checked) {nails = 3}

  if (oralA.checked) {oral = 1}
  else if (oralI.checked) {oral = 2}
  else if (oralD.checked) {oral = 3}

  if (dentureA.checked) {denture = 1}
  else if (dentureI.checked) {denture = 2}
  else if (dentureD.checked) {denture = 3}
  else if (dentureN.checked) {denture = 4}

  if(method === 0 || assist === 0 || rub === 0 || nails === 0 || oral === 0 || denture === 0){
    window.alert("please make sure you have selected one option per category")
    return;
  }


  if (method !== 0 && assist !== 0) {
    sendTwoValues("bathing", method, assist, "method", "assist");
  }
  if (shave !== 0) {
    sendData("shaving", shave);
  }
  if (rub !== 0) {
    sendData("back_rub", rub);
  }
  if (nails !== 0) {
    sendData("nails", nails);
  }
  if (oral !== 0) {
    sendData("oral", oral);
  }
  if (denture !== 0) {
    sendData("denture", denture);
  }

}


