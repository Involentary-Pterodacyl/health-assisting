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

let patientIDs = [];
let patientNames = [];

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

window.onload = () => {
  axios.get("http://localhost:3000/getPatients")
    .then(response => {
      let res = response.data;
      for(let i = 0; i < res.length; i++){
        patientNames.push(res[i]["first_name"] + " " + res[i]["last_name"]);
        patientIDs.push(res[i]["patient_id"]);
      }
      console.log(patientNames);
      console.log(patientIDs);

      console.log(patientNames.length);
      pait1.innerText = patientNames[0];
      pait2.innerText = patientNames[1];
      pait3.innerText = patientNames[2];
      pait4.innerText = patientNames[3];
      pait5.innerText = patientNames[4];
      pait6.innerText = patientNames[5];
      pait7.innerText = patientNames[6];
      pait8.innerText = patientNames[7];
      pait9.innerText = patientNames[8];
      pait10.innerText = patientNames[9];

    })
}

// we shouldn't hardcode the patient id
pait1.onclick = function(){sessionStorage.setItem("patientval", patientIDS[0])};
pait2.onclick = function(){sessionStorage.setItem("patientval", patientIDS[1])};
pait3.onclick = function(){sessionStorage.setItem("patientval", patientIDS[2])};
pait4.onclick = function(){sessionStorage.setItem("patientval", patientIDS[3])};
pait5.onclick = function(){sessionStorage.setItem("patientval", patientIDS[4])};
pait6.onclick = function(){sessionStorage.setItem("patientval", patientIDS[5])};
pait7.onclick = function(){sessionStorage.setItem("patientval", patientIDS[6])};
pait8.onclick = function(){sessionStorage.setItem("patientval", patientIDS[7])};
pait9.onclick = function(){sessionStorage.setItem("patientval", patientIDS[8])};
pait10.onclick = function(){sessionStorage.setItem("patientval", patientIDS[9])};

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
