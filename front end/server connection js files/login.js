let uname = document.getElementById("uname");
let psw = document.getElementById("psw");
let login = document.getElementById("login");


let username;

login.onclick = function () {
  console.log("login");
  username = uname.value;
  sessionStorage.setItem("username", uname.value);
  if (username === "" || psw.value === "") {
    window.alert("Please enter a username and password.");
    return;
  }

  axios.post("http://localhost:3000/login", {username: username})
    .then(response => {
      if (response.data === true && response.data.admin === false) {
        window.location.href = "front%20end/PATIENTS.html";
      }
      if (response.data === true && response.data.admin === true) {
        window.location.href = "front%20end/ "; //teacher page
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


