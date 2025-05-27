import bcrypt from "bcrypt";

let uname = document.getElementById("uname");
let psw = document.getElementById("psw");
let login = document.getElementById("login");

let username;

async function verifyPassword(password) {
  await axios.post("http://localhost:3000/getHash", {username: username})
    .then((response) => {
      bcrypt.compare(password, response.data, function (err, result) {
        if (err) {
          console.error("error (verifyPassword): " + err);
          return;
        }
        if (result) {
          console.log("Password is correct!");
        }
        else {
          console.log("Password is incorrect!");
        }
        return result;
      });
    });
}

login.onclick = function () {
  // grabs inputted username and put it in session storage
  // as well as if either the username or password is empty it prevents code moving forward
  console.log("login");
  username = uname.value;
  sessionStorage.setItem("username", uname.value);
  if (username === "" || psw.value === "") {
    window.alert("Please enter a username and password.");
    return;
  }

  // sends the imputed username to the sever to check if the username exists and sends students to the
  // patient selection page and teachers to the teacher page
  // possible password work in later
  axios.post("http://localhost:3000/login", {username: username})
    .then(response => {
      if (response.data["user"] === true){
        if (verifyPassword(psw.value) === false) {
          window.alert("Incorrect password.\nThis app does not have a \"reset password\" feature. If you have forgotten your password, please create a new account.");
          return;
        }
        if (response.data["admin"] === 0) {
          window.location.href = "front%20end/PATIENTS.html";
        }
        else if (response.data["admin"] === 1) {
          window.location.href = "front%20end/Teacher.html";
        }
      }
      else {
        window.alert("Username is incorrect.");
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

//
// const userPassword = "";
// const userInputPassword = "";
// const storedHashedPassword = "";
//
// hash(userPassword);
//
// function salt() {
//   bcrypt.genSalt(saltRounds, (err, salt) => {
//     if (err) {
//       // Handle error
//       console.log("salt error: " + err);
//       return;
//     }
//
//     // Salt generation successful, proceed to hash the password
//     console.log("salt: " + salt);
//     return salt;
//   });
// }
//
// function hash(userPassword) {
//   bcrypt.hash(userPassword, salt, (err, hash) => {
//     if (err) {
//       // Handle error
//       console.log("hash error: " + err);
//       return;
//     }
//     // Hashing successful, 'hash' contains the hashed password
//     console.log('Hashed password:', hash);
//     return hash;
//   });
// }
//
// bcrypt.compare(userInputPassword, storedHashedPassword, (err, result) => {
//   if (err) {
//     // Handle error
//     console.error('Error comparing passwords:', err);
//     return;
//   }
//   if (result) {
//     // Passwords match, authentication successful
//     console.log('Passwords match! User authenticated.');
//   } else {
//     // Passwords don't match, authentication failed
//     console.log('Passwords do not match! Authentication failed.');
//   }
// });




// axios.get("http://localhost:3000/login_get")
//   .then(response => {
//     console.log("in get.then");
//     console.log('Response:', response.data);
//     if (response.data)
//     {
//       console.log("going to ADL");
//       window.location.href = "front%20end/PATIENTS.html";
//     }
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });


