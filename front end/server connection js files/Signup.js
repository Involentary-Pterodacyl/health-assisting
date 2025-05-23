// let username =  document.getElementById("username");
// let password = document.getElementById("password");
// let password2 = document.getElementById("password2");
// let firstName = document.getElementById("firstName");
// let lastName = document.getElementById("lastName");
let submit = document.getElementById("submit");
// let student = document.getElementById("isntTeacher");
// let teacher = document.getElementById("isTeacher");

let unique;
let isAdmin;

console.log("hi");

async function sendData (){

}

submit.onclick = function() {
  console.log("submit clicked");
//    await new Promise(r => setTimeout(r, 5000));
//   await axios.post("http://localhost:3000/login", {username: username.value})
//     .then(response => {
//       console.log('Response:', response.data["user"]);
//       if (response.data["user"] === true) {
//         unique = false;
//       }
//       else {
//         unique = true;
//       }
//     });
//
//   if (student.checked) {isAdmin = 0}
//   else if (teacher.checked) {isAdmin = 1}
//
//   if (unique === false) {
//     window.alert("This username already exists.");
//     return;
//   }
//
//   if(username.value === "" || password.value === "" || password2.value === "" ||
//     firstName.value === "" || lastName.value === "" || isAdmin === null)
//   {
//     window.alert("Please fill out all fields.");
//     return;
//
//   }
//   console.log(password.value + " " + password2.value);
//   if (password.value !== password2.value) {
//     window.alert("Please make sure both passwords match.");
//     return;
//
//   }
//
//   window.alert("axios request");
//   await axios.post('http://localhost:3000/signup', {username: username.value,  password: password.value, firstName: firstName.value, lastName: lastName.value
//     , admin: isAdmin})
//     .then(async response => {
//       console.log('Response:', response.data);
//       window.alert("data sent successfully.");
//       window.location.href = "front%20end/PATIENTS.html";
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     })
//   // await sendData();
//   console.log("goint ot patients");
//   window.alert("signed up")
//   window.location.href = "front%20end/PATIENTS.html";
}
