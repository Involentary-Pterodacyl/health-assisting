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

// function allows sending the numerical values assigned to each input to the server using the name of the destination table, current students username
// and the id number for the patient the student selected. this one has been modified to send multiple values
function sendMealData(meal, value) {
  axios.post('http://localhost:3000/submitMeal', {tableName: "meal", username:username,  meal: meal, value: value, patientId: patientval})
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  location.reload();
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
let teaCoffee = document.getElementById("teco");
let liq = document.getElementById("liq");
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
  //sends the values for breakfast lunch and dinner
  if(brk1.checked){
    sendMealData(1,1);
  }
  else if(brk2.checked){
    sendMealData(1,2);
  }
  else if (sub1.checked){
    sendMealData(1,3);
  }

  if(lun1.checked){
    sendMealData(2,1);
  }
  else if(lun2.checked){
    sendMealData(2,2);
  }
  else if (sub2.checked){
    sendMealData(2,3);
  }

  if(din1.checked){
    sendMealData(3,1);
  }
  else if(din2.checked){
    sendMealData(3,2);
  }
  else if (sub3.checked){
    sendMealData(3,3);
  }

  // checks the intake and output radios and sets a numerical value for the type selected
  typeIn = 0;
  if(soft.checked){typeIn = 1}
  else if(jui.checked){typeIn = 2}
  else if(wat.checked){typeIn = 3}
  else if(teaCoffee.checked){typeIn = 4}
  else if(liq.checked){typeIn = 5}
  else if(mil.checked){typeIn = 6}
  else if(iv.checked){typeIn = 7}

  typeOut = 0;
  if(uri.checked){typeOut = 1}
  else if(vom.checked){typeOut = 2}
  else if(excpersp.checked){typeOut = 3}
  else if(blood.checked){typeOut = 4}
  else if(wound.checked){typeOut = 5}
  else if(liqsto.checked){typeOut = 6}

  // checks for things the user could do wrong:
  // NaN in input field
  // input but no type selected
  // type but no input
  // nothing entered or selected

  if (isNaN(Number(intake.value)) || isNaN(Number(output.value))){
    window.alert("Invalid input. Enter numbers ONLY in the input fields.");
    return;
  }
  if (intake.value !== "" && typeIn == 0){
    window.alert("Invalid input. Please select a type of intake.");
    return;
  }
  if (output.value !== "" && typeOut == 0){
    window.alert("Invalid input. Please select a type of output.");
    return;
  }
  if (typeIn !== 0 && intake.value === ""){
    window.alert("Invalid input. Please enter an intake amount.");
    return;
  }
  if (typeOut !== 0 && output.value === ""){
    window.alert("Invalid input. Please enter an output amount.");
    return;
  }

  if (typeIn !== 0 && intake.value !== ""){
    //submits intake values
    sendTwoValues("dietary_intake", Number(intake.value), typeIn, "amount", "type");
    console.log("submitted intake");
  }
  if (typeOut !== 0 && output.value !== ""){
    //submits output values
    sendTwoValues("dietary_output", Number(output.value), typeOut, "amount", "type");
    console.log("submitted output");
  }
  }
