let username =  document.getElementById("username");
let password = document.getElementById("password");
let password2 = document.getElementById("password2");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let submit = document.getElementById("submit");
let student = document.getElementById("isntTeacher");
let teacher = document.getElementById("isTeacher");

let unique;
let isAdmin;

console.log("hi");

async function sendData (){

}

submit.onclick = async function() {
  console.log("submit clicked");
  await axios.post("http://localhost:3000/login", {username: username.value})
    .then(response => {
      console.log('Response:', response.data["user"]);
      if (response.data["user"] === true) {
        unique = false;
      }
      else {
        unique = true;
      }
    });

if (student.checked) {isAdmin = 0}
  else if (teacher.checked) {isAdmin = 1}

  if (unique === false) {
    window.alert("This username already exists.");
    return;
  }

  if(username.value === "" || password.value === "" || password2.value === "" ||
    firstName.value === "" || lastName.value === "" || isAdmin === null)
  {
    window.alert("Please fill out all fields.");
    return;

  }
  console.log(password.value + " " + password2.value);
  if (password.value !== password2.value) {
    window.alert("Please make sure both passwords match.");
    return;

  }

  await axios.post('http://localhost:3000/signup', {username: username.value,  password: password.value, firstName: firstName.value, lastName: lastName.value
    , admin: isAdmin})
    .then(async response => {
      console.log('Response:', response.data);
     // window.location.href = ".front end/PATIENTS.html";
    })
    .catch(error => {
      console.error('Error:', error);
    })

  sessionStorage.setItem("username", username.value);

  if (isAdmin){
    window.location.href = "Teacher.html"; // teacher page
  }
  else {
    window.location.href = "PATIENTS.html"; // student page
  }

  // axios.post("http://localhost:3000/login", {username: username})
  //   .then(response => {
  //     console.log(response.data["admin"]);
  //     if (response.data["user"] === true && response.data["admin"] === 0) {
  //       window.location.href = "front%20end/PATIENTS.html";
  //     }
  //     else if (response.data["user"] === true && response.data["admin"] === 1) {
  //       window.location.href = "front%20end/Teacher.html"; //teacher page
  //     }
  //     else {
  //       window.alert("Username or password is incorrect.");
  //     }
  //   })
  //   .catch(error => {
  //     console.error('Error:', error);
  //   });
}
