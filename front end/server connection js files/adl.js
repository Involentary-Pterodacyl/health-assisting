window.onload = () => {
  axios.get('http://localhost:3000/login_get')
    .then(response => {
      console.log(response.data);
      if (response.data === false){
        console.log("not signed in");
        window.location.href = "index.html";
      }
    });
}
