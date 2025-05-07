let username = sessionStorage.getItem("username");
let logout = document.getElementById("signout");

let submit = document.getElementById("submit");
let date1 = document.getElementById("date1");
let date2 = document.getElementById("date2");

let headerNames = ["Student", "Category", "Value", "Patient", "Date"];

// all table names ["bed_mobility_self", "bed_mobility_support", "bed_mobility_position", "bladder", "mood", "sundowning", "meal", "dietary_intake", "dietary_output",
// "eating_self", "eating_support", "toileting_self", "toileting_support", "toileting_consistency", "catheter", "transfers_self",
// "transfers_support", "transfers_device", "weight", "blood_pressure", "oxygen_levels", "pulse", "respiration", "temperature", "bathing", "shaving","back_rub",
// "nails", "oral", "denture"]

const tableNames = ["bed_mobility_self", "bed_mobility_support", "bed_mobility_position", "bladder", "mood"];
let usernames = [];
let studentNames = [];
let categoryRowspans = [];
let allData = [];

await sortStudents();
console.log("usernames:");
console.log(usernames);
console.log("studentNames:");
console.log(studentNames);

// once the page has fully loaded a call is made to the server with the username variable
// to check if the student has signed in
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

submit.onclick = async function () {
  let d1 = date1.value;
  let d2 = date2.value;

  if (d1 === "" || d2 === "") {
    window.alert("Please select both dates.");
    return;
  } else if (d1 > d2) {
    window.alert("The end date must be on or after the start date.");
    return;
  }

  console.log("about to start loop");
  for (let u = 0; u < usernames.length; u++) {
    categoryRowspans[u] = [];
    //allData[u] = [];
    for (let t = 0; t < tableNames.length; t++) {
      await axios.post("http://localhost:3000/teacher", {date1: d1, date2: d2, username: usernames[u], tableName: tableNames[t]})
        .then(res => {
          console.log("data " + usernames[u] + ' ' + tableNames[t]);
          console.log(res.data);
          allData.push(res.data);
          categoryRowspans[u].push(res.data.length);

          // for (let x = 0; x < res.data.length; x++) {
          //   if (usernames.includes(res.data[x]["username"]) === false) {
          //     usernames.push(res.data[x]["username"]);
          //   }
          // }
        })
    }
  }
  console.log("category rowspans: ");
  console.log(categoryRowspans);
  console.log("alldata: ");
  console.log(allData.length);
  console.log(allData);
  //await new Promise(r => setTimeout(r, 1));
  generateTable(usernames, categoryRowspans);
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

//generateTable(["Student 1", "Student 2", "Student 3"], [[1,2,1], [2,1,0], [0,0,0]]);

async function sortStudents() {
  let uNames = [];
  let sNames = [];

  await axios.post("http://localhost:3000/getStudents").then((res) => {
    // console.log("Students:");
    // console.log(res.data);

    for (let i = 0; i < res.data.length; i++) {
      uNames.push(res.data[i]["username"]);
      sNames.push(res.data[i]["first_name"] + " " + res.data[i]["last_name"]);
    }
    // console.log("usernames: " + usernames);
    // console.log("names: " + studentNames);
    // return {usernames: usernames, studentNames: studentNames};
    usernames = uNames;
    studentNames = sNames;
  })
  //await new Promise(r => setTimeout(r, 10));
}


//WORKS
function calcRowspans(usernames, categoryRowspans) {
  // let usernames = ["Student 1", "Student 2"]; // string usernames
  // let categoryRowspans = [[2,1], [0,1]]; // each inner array is for a student, each value is for a category

  let studentRowspans = []; // the rowspan corresponding to each student
  let studentAtRowI = [];
  let catAtRowI = [];
  let numRows = 0;

  for (let i = 0; i < categoryRowspans.length; i++){
    studentRowspans[i] = 0;
    for (let j = 0; j < categoryRowspans[i].length; j++){
      studentRowspans[i] += categoryRowspans[i][j];

      //find the category at row i
      for (let k = 0; k < categoryRowspans[i][j]; k++){
        catAtRowI.push(j);
      }
    }
  }
  numRows = catAtRowI.length;

  for (let i = 0; i < usernames.length; i++) {
    for (let j = 0; j < studentRowspans[i]; j++) {
      studentAtRowI.push(i);
    }
  }
  console.log("studnet rowspans: " + studentRowspans);
  console.log("student at i: " + studentAtRowI);
  console.log("cat at i: " + catAtRowI);
  console.log("numrows: " + numRows);
  return {studentRowspans: studentRowspans, studentAtRowI: studentAtRowI, catAtRowI: catAtRowI, numRows: numRows};
}

function generateTable(students, categoryRowspans) {
  console.log("students: " + students.length);

  let rowspanThings = calcRowspans(students, categoryRowspans);
  let studentRowspans = rowspanThings.studentRowspans;
  let studentAtRowI = rowspanThings.studentAtRowI;
  let catAtRowI = rowspanThings.catAtRowI;
  let numRows = rowspanThings.numRows;

  console.log("test: ");
  console.log(allData[0][0]["value"]);

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
      if (i > 0 &&
        ((j === 0 && studentAtRowI[i] === studentAtRowI[i - 1])
          || (j === 1 && catAtRowI[i] === catAtRowI[i - 1]) && studentAtRowI[i] === studentAtRowI[i - 1])) {
        continue;
      }
      const cell = document.createElement("td");
      if (j === 0) {
        cell.setAttribute("rowSpan", studentRowspans[studentAtRowI[i]].toString());
      }
      else if (j === 1){
        cell.setAttribute("rowSpan", categoryRowspans[studentAtRowI[i]][catAtRowI[i]].toString());
      }
      //const cellText = document.createTextNode(`cell in row ${i}, column ${j}`);
      let cellText;
      if (j === 0){
        cellText = document.createTextNode(studentNames[studentAtRowI[i]]);
      }
      else if (j === 1){
        cellText = document.createTextNode(tableNames[catAtRowI[i]]);
      }
      else if (j === 2){
        // console.log(i + ", " + j);
        // console.log(studentAtRowI[i]);
        cellText = document.createTextNode(`cell in row ${i}, column ${j}`);
        console.log(document.createTextNode(allData[studentAtRowI[i]][catAtRowI[i]]));
      }
      else{
        cellText = document.createTextNode(`cell in row ${i}, column ${j}`);
      }
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
