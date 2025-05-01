let username = sessionStorage.getItem("username");
let submit = document.getElementById("submit");
let date1 = document.getElementById("date1");
let date2 = document.getElementById("date2");



submit.onclick = function (){
  let date1formatting = new Date(date1.value)
  console.log(
    date1formatting.getMonth() + "-" +
    date1formatting.getDate() + "-" +
    date1formatting.getFullYear()
  )
  axios.post("http://localhost:3000/teacher", {date1: date1, date2: date2})
  .then(res => {

  })
}
