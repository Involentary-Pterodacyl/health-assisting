let username = sessionStorage.getItem("username");
let logout = document.getElementById("signout");

let submit = document.getElementById("submit");
let date1 = document.getElementById("date1");
let date2 = document.getElementById("date2");

let headerNames = ["Student", "Category", "Value", "Patient", "Date"];
const tableNames = []; //string names of all tables

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
    let students = res.data["studentNames"];
    console.log(res.data["studentNames"])
    console.log(students);
    generateTable(students);
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

function generateTable(students) {
  //let students = ["Student 1", "Student 2"]; // string usernames
  console.log("students: " + students.length);
  let studentRowspans = [3, 1]; //the rowspan corresponding to each student
  let studentAtRowI = [];

  for (let i = 0; i < students.length; i++) {
    for (let j = 0; j < studentRowspans[i]; j++) {
      studentAtRowI.push(i);
    }
  }
  let numRows = studentAtRowI.length;

// category rowspan stuff
// let categoryRowspans = [[2,1], [1]]; // the rowspan corresponding to each category for each student
// let catAtRowI = [];
//
// for (let i = 0; i < students.length; i++) {
//   for (let j = 0; j < categoryRowspans[i]; j++) {
//     catAtRowI.push(i);
//   }
// }

// create the table header
  const table = document.createElement("table");

  const tableHead = document.createElement("thead");

  const row = document.createElement("tr");
  for (let j = 0; j < headerNames.length; j++){
    const cell = document.createElement("th");
    const cellText = document.createTextNode(headerNames[j]);
    cell.appendChild(cellText);
    row.appendChild(cell);
  }

  tableHead.appendChild(row);
  table.appendChild(tableHead);

//create the table body
  const tableBody = document.createElement("tbody");

  for (let i = 0; i < numRows; i++){
    const row = document.createElement("tr");

    for (let j = 0; j < headerNames.length; j++){
      if ((i > 0 && j === 0 && studentAtRowI[i] === studentAtRowI[i - 1])
        //|| (i > 0 && j === 1 && catAtRowI[i] === catAtRowI[i - 1])
      ) {
        continue;
      }
      const cell = document.createElement("td");
      if (j === 0) {
        cell.setAttribute("rowSpan", studentRowspans[studentAtRowI[i]].toString());
        console.log(studentRowspans[studentAtRowI[i]]);
      }
      const cellText = document.createTextNode(`cell in row ${i}, column ${j}`);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    tableBody.appendChild(row);
  }

  table.appendChild(tableBody);

//add the table to the page
  const tableStart = document.getElementById("tableStart");
  document.body.insertBefore(table, tableStart);
}
