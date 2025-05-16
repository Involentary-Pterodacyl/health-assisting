//imports the id number associated with the patient the student has selected variable created on patients page
// as well as importing username variable created on sign in page
let patientval = sessionStorage.getItem("patientval");
let username = sessionStorage.getItem("username");

let logout = document.getElementById("signout");

let weight = document.getElementById("weight");
let bp = document.getElementById("bp");
let temp = document.getElementById("temp");
let pulse = document.getElementById("pulse");
let respratory = document.getElementById("respratory");

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

// checks propor values have peen put into the boxes. if they have it send the data to the server if not prevents code from continueing
submit.onclick = () => {
  if(isNaN(Number.parseFloat(weight.value)) || isNaN(Number.parseFloat(temp.value)) || isNaN(Number.parseFloat(pulse.value)) || isNaN(Number.parseFloat(respratory.value))){
    window.alert("Please make sure you have filled in all input fields with numbers except BP")
    return;
  }
  if(bp.value === null){
    window.alert("please enter a value in BP");
    return;
  }
  if(bp.value.includes("/" === false)){
    window.alert("Please make sure that BP is filled out with convention num/num")
    return;
  }
  let sidesOfSlash = bp.value.split("/");
  for(let i = 0; i < sidesOfSlash.length; i++){

    if(isNaN(Number.parseFloat(sidesOfSlash[i]))){
      window.alert("Please make sure that BP is filled out with convention num/num")
    }
  }

   sendData("weight", weight.value);
   sendData("blood_pressure", bp.value);
   sendData("temperature", temp.value);
   sendData("pulse", pulse.value);
   sendData("respiration", respratory.value);
}
