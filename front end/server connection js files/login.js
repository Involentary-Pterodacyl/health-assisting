var username = "";

let uname = document.getElementById("uname");
let psw = document.getElementById("psw");
let login = document.getElementById("login");

console.log("null login: ", (login === null));

function getUsername()
{
  return username;
}

if (login !== null) {
  login.onclick = function () {
    console.log("login");
    username = uname.value;
    if (username === "" || psw.value === "") {
      return;
    }

    axios.post("http://localhost:3000/login", {username: username})
      .then(response => {
        if (response.data === true) {
          window.location.href = "front%20end/PATIENTS.html";
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
}

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

export {getUsername};
