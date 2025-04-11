import {getUsername} from "./login.js";

window.onload = () => {
  axios.post('http://localhost:3000/login_get', {user:getUsername()})
    .then(response => {
      console.log(response.data);
      if (response.data === false){
        console.log("not signed in");
        window.location.href = "index.html";
      }
    });
}
