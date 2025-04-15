let username = sessionStorage.getItem("username");
console.log("username (in patients): " + username);

let logout = document.getElementById("signout");

window.onload = () => {
  axios.post('http://localhost:3000/login_get', {username})
    .then(response => {
      console.log("response.data (patients): " + response.data);
      if (response.data === false){
        console.log("not signed in");
        window.location.href = "../index.html";
      }
    });
}
let patientval;

let pait1 = document.getElementById("pait1");
let pait2 = document.getElementById("pait2");
let pait3 = document.getElementById("pait3");
let pait4 = document.getElementById("pait4");
let pait5 = document.getElementById("pait5");
let pait6 = document.getElementById("pait6");
let pait7 = document.getElementById("pait7");
let pait8 = document.getElementById("pait8");
let pait9 = document.getElementById("pait9");
let pait10 = document.getElementById("pait10");

pait1.onclick = function(){patientval = 1};
pait2.onclick = function(){patientval = 2};
pait3.onclick = function(){patientval = 3};
pait4.onclick = function(){patientval = 4};
pait5.onclick = function(){patientval = 5};
pait6.onclick = function(){patientval = 6};
pait7.onclick = function(){patientval = 7};
pait8.onclick = function(){patientval = 8};
pait9.onclick = function(){patientval = 9};
pait10.onclick = function(){patientval = 10};

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

sessionStorage.setItem("patientval", patientval);
