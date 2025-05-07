let uname = document.getElementById("uname");
let psw = document.getElementById("psw");
let login = document.getElementById("login");


let username;

login.onclick = function () {
  // grabs inputted username and put it in session storage
  //as well as if either the username or password is empty it prevents code moving forward
  console.log("login");
  username = uname.value;
  sessionStorage.setItem("username", uname.value);
  if (username === "" || psw.value === "") {
    window.alert("Please enter a username and password.");
    return;
  }

  // sends the imputed username to the sever to check if the username exists and sends students to the
  // patient selection page and teachers to the teacher page
  //possible password work in later
  axios.post("http://localhost:3000/login", {username: username})
    .then(response => {
      console.log(response.data["admin"]);
      if (response.data["user"] === true && response.data["admin"] === 0) {
        window.location.href = "front%20end/PATIENTS.html";
      }
      else if (response.data["user"] === true && response.data["admin"] === 1) {
        window.location.href = "front%20end/Teacher.html"; //teacher page
      }
      else {
        window.alert("Username or password is incorrect.");
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
};




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


