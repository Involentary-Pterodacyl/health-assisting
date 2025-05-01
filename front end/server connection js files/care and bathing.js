let patientval = sessionStorage.getItem("patientval");
let username = sessionStorage.getItem("username");

let logout = document.getElementById("signout");
let submit = document.getElementById("submit");

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

let bath1 = document.getElementById("bmu1");
let bath2 = document.getElementById("bmu2");
let bath3 = document.getElementById("bmu3");
let bath4 = document.getElementById("bmu4");

let bathA = document.getElementById("A1");
let bathI = document.getElementById("I1");
let bathD = document.getElementById("D1");
