
let uname = document.getElementById("uname");
let psw = document.getElementById("psw");
let login = document.getElementById("login");

var username = "";

login.onclick = function (){
  console.log("login");
  username = uname.value;

  axios.post("http://localhost:3000/login",{username:username})
    .then(response => {
      console.log("in login post.then");
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

axios.get("http://localhost:3000/login_get")
  .then(response => {
    console.log("in get.then");
    console.log('Response:', response.data);
    if (response.data)
    {
      console.log("going to ADL");
      window.location.href = "front%20end/PATIENTS.html";
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
