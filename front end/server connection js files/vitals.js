//imports the id number associated with the patient the student has selected variable created on patients page
// as well as importing username variable created on sign in page
let patientval = sessionStorage.getItem("patientval");
let username = sessionStorage.getItem("username");

let logout = document.getElementById("signout");

let weight = document.getElementById("weight");
let bp = document.getElementById("bp");
let o2 = document.getElementById("O2levels");
let pulse = document.getElementById("pulse");
let respratory = document.getElementById("respratory");
let temp = document.getElementById("temp");

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
  axios.post('http://localhost:3000/submit', {tableName: tableName, username: username,  value: value, patientId: patientval})
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  location.reload();
}

// checks proper values have peen put into the boxes. if they have it send the data to the server if not prevents code from continuing
submit.onclick = () => {
  // if(isNaN(Number.parseFloat(weight.value)) || isNaN(Number.parseFloat(temp.value)) || isNaN(Number.parseFloat(pulse.value)) || isNaN(Number.parseFloat(respratory.value))){
  //   window.alert("Please make sure you have filled in all input fields with numbers except BP")
  //   return;
  // }



  if (weight.value !== "") {
    if (isNaN(Number(weight.value))) {
      window.alert("Invalid input. Please enter a number for weight.");
    }
    else {
      sendData("weight", weight.value);
    }
  }
  if (bp.value !== "") {
    let sidesOfSlash = bp.value.split("/");
    if (bp.value.length <= 7 && sidesOfSlash.length === 2 && !isNaN(Number.parseFloat(sidesOfSlash[0])) && !isNaN(Number.parseFloat(sidesOfSlash[1]))){
      sendData("blood_pressure", "'" + bp.value + "'");
    }
    else {
      window.alert("Please make sure that BP is filled out with convention num/num. BP must be less than 8 characters.");
    }
  }
  if (o2.value !== ""){
    if (isNaN(Number(o2.value))) {
      window.alert("Invalid input. Please enter a number for oxygen levels.");
    }
    else {
      sendData("oxygen_levels", o2.value);
    }
  }
  if (pulse.value !== ""){
    if (isNaN(Number(pulse.value))) {
      window.alert("Invalid input. Please enter a number for pulse.");
    }
    else {
      sendData("pulse", pulse.value);
    }
  }
  if (respratory.value !== ""){
    if (isNaN(Number(respratory.value))) {
      window.alert("Invalid input. Please enter a number for respiration.");
    }
    else {
      sendData("respiration", respratory.value);
    }
  }
  if (temp.value !== ""){
    if (isNaN(Number(temp.value))) {
      window.alert("Invalid input. Please enter a number for temperature.");
    }
    else {
      sendData("temperature", temp.value);
    }
  }
}
