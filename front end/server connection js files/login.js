
let uname = document.getElementById("uname");
let psw = document.getElementById("psw");
let login = document.getElementById("login");

var username;
var password;

login.onclick = function (){
  console.log("login");
  password = psw.value
  username = uname.value

  axios.post("http://localhost:3000/login",{username:username})
    .then(response => {
      consle.log("in login post.then");
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

axios.get("http://localhost:3000/login_get")
  .then(response => {
    console.log("in get.then");
    console.log('Response:', response.data);
    if (response.data)
    {
      console.log("going to ADL");
      window.location.href = "front%20end/ADL.html";
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });





function sendData(tableName, value, patientNum) {
  axios.post('http://localhost:3000/submit', {tableName: tableName, username: username,  value: value, patientId: patientNum})
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function sendMealData(valueB, valueL, valueD, patientNum) {
  axios.post('http://localhost:3000/submitMeal', {tableName: "dietary_intake_meal", userId: id,  breakfast: valueB, lunch: valueL, dinner: valueD, patientId: patientNum})
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function sendInOutData(tableName, valueD, valueI, patientNum) {
  axios.post('http://localhost:3000/submitInOut', {tableName: tableName, userId: id,  ccIn: valueD, ccOut: valueI, patientId: patientNum})
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

export {sendData, sendMealData, sendInOutData};
