let username = sessionStorage.getItem("username");
let logout = document.getElementById("signout");

let submit = document.getElementById("submit");
let date1 = document.getElementById("date1");
let date2 = document.getElementById("date2");

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


submit.onclick = function (){
  let d1 = date1.value;
  let d2 = date2.value;
  //database date format: YYYY-MM-DD HH:MM:SS
  console.log("d1: " + d1); //YYYY-MM-DD
  console.log("typeof d1: " + typeof d1); //string

  if (d1 === "" || d2 === "") {
    window.alert("Please select both dates.");
    return;
  }
  else if (d1 > d2) {
    window.alert("The end date must be on or after the start date.");
    return;
  }
  axios.post("http://localhost:3000/teacher", {date1: d1, date2: d2})
  .then(res => {

  })
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
