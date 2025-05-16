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
// and the id number for the patient the student selected. this one has been modified to send multiple values
//                                                                                         type           amount
function sendTwoValues(tableName, valueD, valueI, tableScetion1, tableScetion2) {
  axios.post('http://localhost:3000/twoValues', {tableName: tableName, username: username,  val1: valueD, val2: valueI,
    patientId: patientval, tableScetion1: tableScetion1, tableScetion2: tableScetion2})
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// function allows sending the numerical values assigned to each input to the server using the name of the destination table, current students username
// and the id number for the patient the student selected. this one has been modified to send multiple values
function sendMealData(valueB, valueL, valueD) {
  axios.post('http://localhost:3000/submitMeal', {tableName: "dietary_intake_meal", username:username,  breakfast: valueB, lunch: valueL, dinner: valueD, patientId: patientval})
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

let brk1 = document.getElementById("brk1");
let brk2 = document.getElementById("brk2");
let sub1 = document.getElementById("sub1");

let lun1 = document.getElementById("lun1");
let lun2 = document.getElementById("lun2");
let sub2 = document.getElementById("sub2");

let din1 = document.getElementById("din1");
let din2 = document.getElementById("din2");
let sub3 = document.getElementById("sub3");

let intake = document.getElementById("intakeinput");
let soft = document.getElementById("soft");
let jui = document.getElementById("jui");
let wat = document.getElementById("wat");
let teaCoffee = document.getElementById("liq");
let mil = document.getElementById("mil");
let iv = document.getElementById("iv");

let output = document.getElementById("outputtype");
let uri = document.getElementById("uri");
let vom = document.getElementById("vom");
let excpersp = document.getElementById("excpersp");
let blood = document.getElementById("blood");
let wound = document.getElementById("wound");
let liqsto = document.getElementById("liqsto");

let submit = document.getElementById("submit");

let brk;
let lun;
let din;
let typeIn;
let typeOut;
//once the submit button is clicked the program sets the corresponding breakfast lunch and dinner variables to the value which has been selected
submit.onclick = function(){
  if(brk1.checked){brk = true}
  else if(brk2.checked){brk = false}
  else if (sub1.checked){brk = null}

  if(lun1.checked){lun = true}
  else if(lun2.checked){lun = false}
  else if (sub2.checked){lun = null}

  if (din1.checked){din = true}
  else if (din2.checked){din = false}
  else if (sub3.checked){din = null}

  // this checks if something has been selected and if it hasnt it will force you to
  if(brk1.checked === false && brk2.checked === false && sub1.checked === false){
    window.alert("Please select one of the 3 options in the Breakfast section")
    return;
  }
  if(lun1.checked === false && lun2.checked === false && sub2.checked === false){
    window.alert("Please select one of the 3 options in the Lunch section")
    return;
  }
  if(din1.checked === false && din2.checked === false && sub3.checked === false){
    window.alert("Please select one of the 3 options in the Dinner section")
    return;
  }

  //sends the values for breakfast lunch and dinner
  sendMealData(brk, lun, din);

  // checks the intake and outake radios and sets a numarical value for the type selected
  if(soft.checked){typeIn = 1}
  else if(jui.checked){typeIn = 2}
  else if(wat.checked){typeIn = 3}
  else if(teaCoffee.checked){typeIn = 4}
  else if(mil.checked){typeIn = 5}
  else if(iv.checked){typeIn = 6}

  if(uri.checked){typeOut = 1}
  else if(vom.checked){typeOut = 2}
  else if(excpersp.checked){typeOut = 3}
  else if(blood.checked){typeOut = 4}
  else if(wound.checked){typeOut = 5}
  else if(liqsto.checked){typeOut = 6}

    // makes sure an int was put into the imput box
  console.log(Number(intake.value));
    if(isNaN(Number(intake.value)) || isNaN(Number(output.value)) || typeIn === null || typeOut === null){
      window.alert("Invalid input please make sure you have enter numbers ONLY in the input fields")
      return;
    }
    console.log("submitted meal");
    //submits intake and output values
  sendTwoValues("dietary_intake_in", intake.value, typeIn, "amount", "type");
  sendTwoValues("dietary_intake_out", output.value, typeOut, "amount", "type");
  }
