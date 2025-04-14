import {getUsername} from "./login.js";

//console.log(username);

window.onload = () => {
  //axios.post('http://localhost:3000/login_get', {username:getUsername()})
  axios.post('http://localhost:3000/login_get', {username:"TestUser"})
    .then(response => {
      console.log(response.data);
      if (response.data === false){
        console.log("not signed in");
        window.location.href = "../index.html";
      }
    });
}
