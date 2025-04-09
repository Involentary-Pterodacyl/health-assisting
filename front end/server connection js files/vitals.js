
axios.get("http://localhost:3000/login_get")
  .then(response => {
    if(response.data === false)
    {
      window.location.href = "index.html";
    }
  })

function sendData(tableName, value, patientNum) {
  axios.post('http://localhost:3000/submit', {tableName: tableName, username: username,  value: value, patientId: patientNum})
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
