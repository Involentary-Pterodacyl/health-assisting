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

submit.onclick = async function() {
  await axios.post("http://localhost:3000/login", {username: username.value})
    .then(response => {
      if (response.data["user"] === true) {
        unique = false;
      }
      else {
        unique = true;
      }
    })

  if (student.checked) {isAdmin = 0}
  else if (teacher.checked) {isAdmin = 1}

  if (unique === false) {
    window.alert("username already exists");
    return;
  }

  if(username.value === "" || password.value === "" || password2.value === "" ||
    firstName.value === "" || lastName.value === "" || isAdmin === null)
  {
    window.alert("Please fill out all fields");
    return;

  }
  console.log(password.value + " " + password2.value);
  if (password.value !== password2.value) {
    window.alert("Please make sure both passwords match");
    return;

  }

  await axios.post('http://localhost:3000/signup', {username: username.value,  password: password.value, firstName: firstName.value, lastName: lastName.value
    , admin: isAdmin})
    .then(response => {
      console.log('Response:', response.data);

    })
    .catch(error => {
      console.error('Error:', error);
    });
console.log("goint ot patients");
window.alert("signed up")
  window.location.href = "../PATIENTS.html";
}
